import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { FlowLogTrafficType, SubnetType } from "aws-cdk-lib/aws-ec2";
import {
  IBuilderVpcStyle,
  IBuildVpcProvides,
  IVpcWorkloadProps,
  SubnetNamedMasks,
} from "./types";
import { BuilderVpc } from "./abstract-buildervpc";
import * as ram from "aws-cdk-lib/aws-ram";
import { ramResourceShareName } from "./name-utils";

export class VpcWorkloadStandaloneStack extends BuilderVpc {
  vpcStyle: IBuilderVpcStyle = "workloadStandalone";
  props: IVpcWorkloadProps;
  provides: IBuildVpcProvides = "workload";
  tgwCreateTgwSubnets: boolean = false;
  interfaceEndpointSubnetNames: Array<string> = [];
  interfaceEndpointSecurityGroup: ec2.SecurityGroup;

  constructor(scope: Construct, id: string, props: IVpcWorkloadProps) {
    super(scope, id, props);

    this.name = `${props.namePrefix}-vpc-standalone-workload`.toLowerCase();

    const vpcProps: ec2.VpcProps = {
      ipAddresses: ec2.IpAddresses.cidr(this.props.vpcCidr),
      enableDnsHostnames: true,
      enableDnsSupport: true,
      maxAzs: this.props.availabilityZones.length,
      natGateways: this.natGatewayCount(),
      subnetConfiguration: [],
      gatewayEndpoints: {
        S3: {
          service: ec2.GatewayVpcEndpointAwsService.S3,
        },
        DDB: {
          service: ec2.GatewayVpcEndpointAwsService.DYNAMODB,
        },
      },
    };

    props.createSubnets.forEach((createSubnet) => {
      vpcProps.subnetConfiguration?.push({
        name: createSubnet.name.toLowerCase(),
        cidrMask: createSubnet.cidrMask,
        subnetType: this.subnetType(createSubnet),
      });
      this.trackSubnetName(createSubnet);
    });

    this.vpc = new ec2.Vpc(this, this.name, vpcProps);
    this.vpc.addFlowLog("VpcFlowLogs", {
      destination: ec2.FlowLogDestination.toCloudWatchLogs(),
      trafficType: FlowLogTrafficType.ALL,
    });
    this.createInterfaceEndpoints();

    this.props.createSubnets.forEach((createSubnet) => {
      if (createSubnet.sharedWith) {
        new ram.CfnResourceShare(this, `RamShare${createSubnet.name}`, {
          allowExternalPrincipals: false,
          name: ramResourceShareName(
            this.name,
            createSubnet.name,
            createSubnet.subnetType ?? "isolated"
          ),
          permissionArns: [
            "arn:aws:ram::aws:permission/AWSRAMDefaultPermissionSubnet",
          ],
          principals: this.ramPrincipals(createSubnet.sharedWith),
          resourceArns: this.subnetArnsByName(createSubnet.name),
        });
      }
    });
  }

  natGatewayCount(): number {
    const hasPrivateWithEgress = this.props.createSubnets.some(
      (createSubnet) => createSubnet.subnetType == "privateWithEgress"
    );
    if (!hasPrivateWithEgress || this.props.natGatewayStrategy == "none") {
      return 0;
    }
    if (this.props.natGatewayStrategy == "perVpc") {
      return 1;
    }
    return this.props.availabilityZones.length;
  }

  createInterfaceEndpoints(): void {
    if (!this.props.interfaceList?.length) {
      return;
    }
    this.endpointSecurityGroup();
    let previousEndpoint: ec2.InterfaceVpcEndpoint | undefined;
    this.props.interfaceList.forEach((endpointName, index) => {
      if (!this.serviceAvailableInAllAzs(endpointName)) {
        throw new Error(
          `Endpoint ${endpointName} is not available in all Availability Zones: ${this.availabilityZones.join(",")}`
        );
      }
      const endpointNameShort = this.endpointNameShort(endpointName);
      const endpoint = new ec2.InterfaceVpcEndpoint(
        this,
        `InterfaceEndpoint-${endpointNameShort}`,
        {
          privateDnsEnabled: true,
          service: new ec2.InterfaceVpcEndpointAwsService(endpointNameShort),
          vpc: this.vpc,
          subnets: {
            subnets: this.interfaceEndpointSubnets(),
          },
          securityGroups: [this.interfaceEndpointSecurityGroup],
        }
      );
      if (previousEndpoint) {
        endpoint.node.addDependency(previousEndpoint);
      }
      if (index % 3 == 0) {
        previousEndpoint = endpoint;
      }
    });
  }

  endpointSecurityGroup(): void {
    this.interfaceEndpointSecurityGroup = new ec2.SecurityGroup(
      this,
      "VPCEndpointSecurityGroup",
      {
        allowAllOutbound: true,
        description: "Security Group for VPC Interface Endpoints",
        vpc: this.vpc,
      }
    );
    this.interfaceEndpointSecurityGroup.addIngressRule(
      ec2.Peer.ipv4(this.props.vpcCidr),
      ec2.Port.tcp(443),
      "Allow endpoint use from VPC CIDR via HTTPS"
    );
  }

  interfaceEndpointSubnets(): ec2.ISubnet[] {
    return this.interfaceEndpointSubnetNames.flatMap(
      (subnetName) =>
        this.vpc.selectSubnets({ subnetGroupName: subnetName }).subnets
    );
  }

  serviceAvailableInAllAzs(serviceName: string): boolean {
    const service = this.props.interfaceDiscovery?.find(
      (service) => service.ServiceName == serviceName
    );
    return !!(
      service?.AvailabilityZones &&
      this.availabilityZones.every((availabilityZone) =>
        service.AvailabilityZones?.includes(availabilityZone)
      )
    );
  }

  endpointNameShort(endpointName: string): string {
    return endpointName.split(".").slice(3).join(".");
  }

  subnetType(createSubnet: SubnetNamedMasks): SubnetType {
    switch (createSubnet.subnetType ?? "isolated") {
      case "public":
        return SubnetType.PUBLIC;
      case "privateWithEgress":
        return SubnetType.PRIVATE_WITH_EGRESS;
      case "interfaceEndpoint":
      case "isolated":
        return SubnetType.PRIVATE_ISOLATED;
    }
  }

  trackSubnetName(createSubnet: SubnetNamedMasks): void {
    const subnetName = createSubnet.name.toLowerCase();
    switch (createSubnet.subnetType ?? "isolated") {
      case "public":
        this.publicSubnetNames.push(subnetName);
        return;
      case "privateWithEgress":
        this.privateSubnetNames.push(subnetName);
        return;
      case "interfaceEndpoint":
        this.interfaceEndpointSubnetNames.push(subnetName);
        this.privateIsolatedSubnetNames.push(subnetName);
        return;
      case "isolated":
        this.privateIsolatedSubnetNames.push(subnetName);
        return;
    }
  }

  subnetArnsByName(subnetName: string) {
    const subnetArns: Array<string> = [];
    this.vpc
      .selectSubnets({ subnetGroupName: subnetName })
      .subnets.forEach((subnet) => {
        const subnetId = (subnet as ec2.Subnet).subnetId;
        subnetArns.push(
          `arn:aws:ec2:${this.region}:${this.account}:subnet/${subnetId}`
        );
      });
    return subnetArns;
  }

  ramPrincipals(sharedWithList: Array<string | number>) {
    const ramPrincipals: Array<string> = [];
    for (const sharedWith of sharedWithList) {
      if (Number.isInteger(sharedWith)) {
        ramPrincipals.push(`${sharedWith}`);
      } else {
        const sharedWithString = sharedWith.toString();
        let organizationMainAccountId = this.props.organizationMainAccountId;
        if (this.props.legacyRamShare) {
          organizationMainAccountId = this.account;
        }
        if (sharedWithString.startsWith("o-")) {
          ramPrincipals.push(
            `arn:aws:organizations::${organizationMainAccountId}/${sharedWith}`
          );
        } else if (sharedWithString.startsWith("ou-")) {
          if (this.props.organizationId) {
            ramPrincipals.push(
              `arn:aws:organizations::${organizationMainAccountId}:ou/${this.props.organizationId}/${sharedWith}`
            );
          }
        } else {
          throw new Error(
            `SharedWith contained string: ${sharedWithString} which could not be mapped`
          );
        }
      }
    }
    return ramPrincipals;
  }
}
