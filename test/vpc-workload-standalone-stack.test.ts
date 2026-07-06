import { Match, Template } from "aws-cdk-lib/assertions";
import * as cdk from "aws-cdk-lib";
import { IConfig, IConfigVpc } from "../lib/config/config-types";
import { StackBuilderClass } from "../lib/stack-builder";

const standaloneConfig = (vpc: Partial<IConfigVpc> = {}): IConfig => ({
  global: {
    stackNamePrefix: "testing",
    ssmPrefix: "/ssm/prefix",
    region: "us-east-1",
    availabilityZones: ["us-east-1a", "us-east-1b"],
  },
  vpcs: {
    dev: {
      style: "workloadStandalone",
      vpcCidr: "10.4.0.0/16",
      subnets: {
        workload: {
          cidrMask: 21,
        },
      },
      ...vpc,
    },
  },
});

const buildStandalone = async (config: IConfig) => {
  const stackBuilder = new StackBuilderClass({});
  stackBuilder.configure(undefined, config);
  await stackBuilder.build();

  const workloadStack = stackBuilder.stacks.workload[0].stack;
  const template = Template.fromStack(workloadStack as unknown as cdk.Stack);
  return { template, workloadStack };
};

test("WorkloadStandaloneIsolatedOnlyBuildsWithoutInternetNatOrTgw", async () => {
  const { template, workloadStack } = await buildStandalone(
    standaloneConfig()
  );

  expect(workloadStack.publicSubnetNames).toEqual([]);
  expect(workloadStack.privateSubnetNames).toEqual([]);
  expect(workloadStack.privateIsolatedSubnetNames).toEqual(["workload"]);
  template.resourceCountIs("AWS::EC2::Subnet", 2);
  template.resourceCountIs("AWS::EC2::InternetGateway", 0);
  template.resourceCountIs("AWS::EC2::NatGateway", 0);
  template.resourceCountIs("AWS::EC2::TransitGatewayVpcAttachment", 0);
  template.resourceCountIs("AWS::EC2::TransitGatewayRouteTable", 0);
});

test("WorkloadStandaloneSharedSubnetsIncludeSubnetContextInRamShareName", async () => {
  const { template } = await buildStandalone(
    standaloneConfig({
      subnets: {
        workload: {
          cidrMask: 21,
          sharedWith: [123456789012],
        },
      },
    })
  );

  template.hasResourceProperties("AWS::RAM::ResourceShare", {
    Name: "Share-dev-vpc-standalone-workload-workload-isolated",
  });
});

test("WorkloadStandalonePublicOnlyUsesIgwWithoutNat", async () => {
  const { template, workloadStack } = await buildStandalone(
    standaloneConfig({
      natGatewayStrategy: "none",
      subnets: {
        public: {
          cidrMask: 21,
          subnetType: "public",
        },
      },
    })
  );

  expect(workloadStack.publicSubnetNames).toEqual(["public"]);
  expect(workloadStack.privateSubnetNames).toEqual([]);
  expect(workloadStack.privateIsolatedSubnetNames).toEqual([]);
  template.resourceCountIs("AWS::EC2::InternetGateway", 1);
  template.resourceCountIs("AWS::EC2::NatGateway", 0);
  template.hasResourceProperties("AWS::EC2::Route", {
    DestinationCidrBlock: "0.0.0.0/0",
    GatewayId: Match.anyValue(),
  });
});

test("WorkloadStandalonePrivateWithEgressUsesOneNatPerVpc", async () => {
  const { template, workloadStack } = await buildStandalone(
    standaloneConfig({
      natGatewayStrategy: "perVpc",
      subnets: {
        public: {
          cidrMask: 24,
          subnetType: "public",
        },
        app: {
          cidrMask: 21,
          subnetType: "privateWithEgress",
        },
      },
    })
  );

  expect(workloadStack.publicSubnetNames).toEqual(["public"]);
  expect(workloadStack.privateSubnetNames).toEqual(["app"]);
  template.resourceCountIs("AWS::EC2::InternetGateway", 1);
  template.resourceCountIs("AWS::EC2::NatGateway", 1);
  template.hasResourceProperties("AWS::EC2::Route", {
    DestinationCidrBlock: "0.0.0.0/0",
    NatGatewayId: Match.anyValue(),
  });
});

test("WorkloadStandalonePrivateWithEgressUsesOneNatPerAz", async () => {
  const { template } = await buildStandalone(
    standaloneConfig({
      natGatewayStrategy: "perAz",
      subnets: {
        public: {
          cidrMask: 24,
          subnetType: "public",
        },
        app: {
          cidrMask: 21,
          subnetType: "privateWithEgress",
        },
      },
    })
  );

  template.resourceCountIs("AWS::EC2::NatGateway", 2);
});

test("WorkloadStandaloneInterfaceEndpointSubnetsStayIsolated", async () => {
  const { template, workloadStack } = await buildStandalone(
    standaloneConfig({
      interfaceEndpointConfigFile: "standalone-endpoints",
      subnets: {
        endpoints: {
          cidrMask: 24,
          subnetType: "interfaceEndpoint",
        },
      },
    })
  );

  expect(workloadStack.publicSubnetNames).toEqual([]);
  expect(workloadStack.privateSubnetNames).toEqual([]);
  expect(workloadStack.privateIsolatedSubnetNames).toEqual(["endpoints"]);
  template.resourceCountIs("AWS::EC2::InternetGateway", 0);
  template.resourceCountIs("AWS::EC2::NatGateway", 0);
});

test("WorkloadStandaloneCreatesLocalStsEndpoint", async () => {
  const { template } = await buildStandalone(
    standaloneConfig({
      interfaceEndpointConfigFile: "standalone-endpoints",
      subnets: {
        endpoints: {
          cidrMask: 24,
          subnetType: "interfaceEndpoint",
        },
      },
    })
  );

  template.resourceCountIs("AWS::EC2::VPCEndpoint", 3);
  template.hasResourceProperties("AWS::EC2::VPCEndpoint", {
    PrivateDnsEnabled: true,
    ServiceName: {
      "Fn::Join": [
        "",
        [
          "com.amazonaws.",
          {
            Ref: "AWS::Region",
          },
          ".sts",
        ],
      ],
    },
    SubnetIds: [Match.anyValue(), Match.anyValue()],
    VpcEndpointType: "Interface",
  });
  template.hasResourceProperties("AWS::EC2::SecurityGroup", {
    SecurityGroupIngress: Match.arrayWith([
      Match.objectLike({
        CidrIp: "10.4.0.0/16",
        FromPort: 443,
        IpProtocol: "tcp",
        ToPort: 443,
      }),
    ]),
  });
});
