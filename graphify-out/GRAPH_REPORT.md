# Graph Report - .  (2026-07-04)

## Corpus Check
- 99 files · ~224,644 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 920 nodes · 1767 edges · 60 communities (51 shown, 9 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_VPC Builder Core|VPC Builder Core]]
- [[_COMMUNITY_Stack Builder Config|Stack Builder Config]]
- [[_COMMUNITY_Gateway Builders|Gateway Builders]]
- [[_COMMUNITY_Config Walkthrough|Config Walkthrough]]
- [[_COMMUNITY_Config Parser|Config Parser]]
- [[_COMMUNITY_StrongSwan Routes|StrongSwan Routes]]
- [[_COMMUNITY_DNS Schema|DNS Schema]]
- [[_COMMUNITY_Config Interfaces|Config Interfaces]]
- [[_COMMUNITY_Egress Samples|Egress Samples]]
- [[_COMMUNITY_TypeScript Compiler|TypeScript Compiler]]
- [[_COMMUNITY_Sample Config Docs|Sample Config Docs]]
- [[_COMMUNITY_Firewall VPN Samples|Firewall VPN Samples]]
- [[_COMMUNITY_Transit Gateway Stacks|Transit Gateway Stacks]]
- [[_COMMUNITY_Config Schema Root|Config Schema Root]]
- [[_COMMUNITY_Ingress Samples|Ingress Samples]]
- [[_COMMUNITY_Endpoint Style Schema|Endpoint Style Schema]]
- [[_COMMUNITY_Provider Type Schema|Provider Type Schema]]
- [[_COMMUNITY_Global Config Schema|Global Config Schema]]
- [[_COMMUNITY_Schema Definitions|Schema Definitions]]
- [[_COMMUNITY_Standalone Endpoints|Standalone Endpoints]]
- [[_COMMUNITY_Stack Mapper|Stack Mapper]]
- [[_COMMUNITY_README Overview|README Overview]]
- [[_COMMUNITY_VPC Schema|VPC Schema]]
- [[_COMMUNITY_Complex Config Sample|Complex Config Sample]]
- [[_COMMUNITY_VPC Endpoint Docs|VPC Endpoint Docs]]
- [[_COMMUNITY_VPN OnPrem Docs|VPN OnPrem Docs]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_Endpoint Sample Config|Endpoint Sample Config]]
- [[_COMMUNITY_Central Egress Docs|Central Egress Docs]]
- [[_COMMUNITY_Complex Sample Docs|Complex Sample Docs]]
- [[_COMMUNITY_Existing VPC Route53|Existing VPC Route53]]
- [[_COMMUNITY_Parser Tests|Parser Tests]]
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_GitHub Node Workflow|GitHub Node Workflow]]
- [[_COMMUNITY_Contribution Docs|Contribution Docs]]
- [[_COMMUNITY_Static Route Lambda|Static Route Lambda]]
- [[_COMMUNITY_DNS Existing VPC Schema|DNS Existing VPC Schema]]
- [[_COMMUNITY_DNS Hosted Zones|DNS Hosted Zones]]
- [[_COMMUNITY_Package Scripts|Package Scripts]]
- [[_COMMUNITY_Provider Endpoints Schema|Provider Endpoints Schema]]
- [[_COMMUNITY_Provider Firewall Schema|Provider Firewall Schema]]
- [[_COMMUNITY_TGW Default Routes|TGW Default Routes]]
- [[_COMMUNITY_TGW Routes Schema|TGW Routes Schema]]
- [[_COMMUNITY_VPN Tunnel Schema|VPN Tunnel Schema]]
- [[_COMMUNITY_Standalone Stack Tests|Standalone Stack Tests]]
- [[_COMMUNITY_DNS Config Schema|DNS Config Schema]]
- [[_COMMUNITY_Named Endpoints Schema|Named Endpoints Schema]]
- [[_COMMUNITY_Internet Provider Schema|Internet Provider Schema]]
- [[_COMMUNITY_TGW Peers Schema|TGW Peers Schema]]
- [[_COMMUNITY_NAT Strategy Schema|NAT Strategy Schema]]
- [[_COMMUNITY_VPC Style Schema|VPC Style Schema]]
- [[_COMMUNITY_Code Of Conduct|Code Of Conduct]]
- [[_COMMUNITY_Complex Endpoints List|Complex Endpoints List]]
- [[_COMMUNITY_VPC Endpoints List|VPC Endpoints List]]
- [[_COMMUNITY_Standalone Endpoints List|Standalone Endpoints List]]
- [[_COMMUNITY_Bug Report Template|Bug Report Template]]
- [[_COMMUNITY_Feature Request Template|Feature Request Template]]
- [[_COMMUNITY_Jest Config|Jest Config]]

## God Nodes (most connected - your core abstractions)
1. `ConfigParser` - 53 edges
2. `StackBuilderClass` - 38 edges
3. `BuilderVpc` - 36 edges
4. `definitions` - 36 edges
5. `IBuilderVpc` - 35 edges
6. `TransitGatewayRoutesStack` - 29 edges
7. `ITgw` - 28 edges
8. `AWS VPC Builder` - 26 edges
9. `This is a good place to start to understand the available parameters to build your network environment with` - 25 edges
10. `IBuilderVpcStyle` - 22 edges

## Surprising Connections (you probably didn't know these)
- `Functional Description` --references--> `required`  [EXTRACTED]
  config/sample-vpc-endpoints.md → lib/config/config-schema.json
- `Functional Description` --references--> `required`  [EXTRACTED]
  config/sample-vpc-endpoints.md → lib/config/config-schema.json
- `Functional Description` --references--> `required`  [EXTRACTED]
  config/sample-vpc-endpoints.md → lib/config/config-schema.json
- `Functional Description` --references--> `required`  [EXTRACTED]
  config/sample-vpc-endpoints.md → lib/config/config-schema.json
- `Functional Description` --references--> `required`  [EXTRACTED]
  config/sample-vpc-endpoints.md → lib/config/config-schema.json

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Sample Vpn Onprem Artifacts** — config_sample_vpn_onprem_document, images_sample_vpn_onprem_image, images_sample_vpn_onprem_image [INFERRED 0.75]

## Communities (60 total, 9 thin omitted)

### Community 0 - "VPC Builder Core"
Cohesion: 0.05
Nodes (47): BuilderVpc, CdkExportPersistenceStack, ICdkExportPersistenceProps, IConfigProviderRoute53EndpointsForExistingVpcs, directConnectGatewayProps, endpointStackProps, firewallStackProps, internetStackProps (+39 more)

### Community 1 - "Stack Builder Config"
Cohesion: 0.06
Nodes (26): IConfigProviderEndpoints, IConfigTgwRoutes, cdkStacks, cdkVpcStackTypes, dxGwKeys, IStackBuilderProps, namedDxGwStack, namedTgwPeerStack (+18 more)

### Community 2 - "Gateway Builders"
Cohesion: 0.07
Nodes (37): client, findVpnTransitGatewayAttachId(), onEvent(), BuilderDxGw, BuilderTgwPeer, BuilderVpn, IConfigVpnTunnelOptions, DirectConnectGatewayStack (+29 more)

### Community 3 - "Config Walkthrough"
Cohesion: 0.05
Nodes (49): and VPCs within this configuration file.  NOTE: Where sharing with another accounts VPC is desired you will need to use, This is a good place to start to understand the available parameters to build your network environment with, endpoint services etc.  They are purpose built to best practices and can be used by our VPCs to provide centralized services., Feel free to copy this and make your own that reflects the environment you want to build., OPTIONAL|DEPENDANT: Providers are 'special VPCs' that provide a network function.  ie: Internet access, firewall services,, OPTIONAL: Route53 Private Hosted Zones may be defined, and shared with both external to this configuration file VPCs, OPTIONAL:  These define Transit Gateway attached VPN connections that we can route to.  Many can be defined, then advertise the, REQUIRED: Global contains variables that are used throughout all stacks (+41 more)

### Community 5 - "StrongSwan Routes"
Cohesion: 0.06
Nodes (40): Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved., type, IConfigTgwBlackholeRoutes, IConfigTgwDynamicRoutes, IConfigTgwStaticRoutes, IConfigVpcSubnet, additionalProperties, properties (+32 more)

### Community 6 - "DNS Schema"
Cohesion: 0.06
Nodes (40): items, IConfigDnsEntry, IConfigProviderRoute53EndpointsForwardRequests, items, type, items, type, items (+32 more)

### Community 7 - "Config Interfaces"
Cohesion: 0.06
Nodes (32): IConfigConfigTag, IConfigDns, IConfigDnsEntry, IConfigDxGw, IConfigDxGws, IConfigGlobal, IConfigProviderEndpointsNamed, IConfigProviderFirewall (+24 more)

### Community 8 - "Egress Samples"
Cohesion: 0.10
Nodes (25): sample-central-egress-inspected.vpcBuilder, global, providers, transitGateways, vpcs, sample-central-ingress-inspected.vpcBuilder, global, providers (+17 more)

### Community 9 - "TypeScript Compiler"
Cohesion: 0.09
Nodes (21): compilerOptions, alwaysStrict, declaration, experimentalDecorators, inlineSourceMap, lib, module, noFallthroughCasesInSwitch (+13 more)

### Community 10 - "Sample Config Docs"
Cohesion: 0.12
Nodes (21): Sample Configuration Files, Adding Inspection, Architecture Diagram, Deployment, Exploring inspection, Exploring this example, Functional Description, Resources (+13 more)

### Community 11 - "Firewall VPN Samples"
Cohesion: 0.12
Nodes (20): sample-firewall-blog.vpcBuilder, global, providers, transitGateways, vpcs, vpns, sample-vpn-onprem.vpcBuilder, global (+12 more)

### Community 12 - "Transit Gateway Stacks"
Cohesion: 0.19
Nodes (10): TransitGateway, DnsRoute53PrivateHostedZonesClass, ITransitGatewayProps, TransitGatewayStack, ITransitGatewayBase, ITransitGatewayBaseProps, ITransitGatewayProvides, ITransitGatewayStyle (+2 more)

### Community 13 - "Config Schema Root"
Cohesion: 0.11
Nodes (17): additionalProperties, $ref, $ref, $ref, properties, dns, dxgws, global (+9 more)

### Community 14 - "Ingress Samples"
Cohesion: 0.16
Nodes (17): type, type, $ref, properties, properties, properties, availabilityZones, awsFirewallExistingRuleArn (+9 more)

### Community 15 - "Endpoint Style Schema"
Cohesion: 0.12
Nodes (16): $ref, IConfigDxGws, IConfigProviderFirewallNamed, IConfigTgws, IConfigVpcNamedSubnets, IConfigVpns, additionalProperties, type (+8 more)

### Community 16 - "Provider Type Schema"
Cohesion: 0.13
Nodes (15): type, IConfigVpc, additionalProperties, properties, required, type, type, type (+7 more)

### Community 17 - "Global Config Schema"
Cohesion: 0.13
Nodes (15): IConfigGlobal, type, additionalProperties, properties, required, type, type, type (+7 more)

### Community 18 - "Schema Definitions"
Cohesion: 0.14
Nodes (14): type, definitions, IConfigConfigTag, IConfigProvidersEndpointsStyles, IConfigVpcs, IConfigVpcSubnetType, additionalProperties, type (+6 more)

### Community 19 - "Standalone Endpoints"
Cohesion: 0.19
Nodes (3): IConfigVpcSubnetType, SubnetNamedMasks, VpcWorkloadStandaloneStack

### Community 21 - "README Overview"
Cohesion: 0.17
Nodes (13): Index 1024X523, AWS Resource Access Manager RAM Sharing, AWS VPC Builder, Bootstrap, CDK, Configure, Deployment Account, Environment Setup (+5 more)

### Community 22 - "VPC Schema"
Cohesion: 0.17
Nodes (12): dns, sample-complex.vpcBuilder, global, providers, transitGateways, vpcs, vpns, providerInternet (+4 more)

### Community 23 - "Complex Config Sample"
Cohesion: 0.18
Nodes (12): Architecture Diagram, Deployment, Functional Description, Exploring this example, Resources, Teardown, Troubleshooting Teardown, Sample Vpc Endpoints (+4 more)

### Community 24 - "VPC Endpoint Docs"
Cohesion: 0.18
Nodes (12): Architecture Diagram, Deployment, Functional Description, Exploring this example, PSK into Secrets manager, Resources, Teardown, Testing the VPN with an Ec2 instance (+4 more)

### Community 25 - "VPN OnPrem Docs"
Cohesion: 0.17
Nodes (12): dependencies, ajv, aws-cdk-lib, @aws-cdk/region-info, @aws-sdk/client-ec2, constructs, esbuild, ip-cidr (+4 more)

### Community 26 - "Runtime Dependencies"
Cohesion: 0.18
Nodes (11): sample-vpc-endpoints.vpcBuilder, global, providers, transitGateways, vpcs, type, type, endpointConfigFile (+3 more)

### Community 27 - "Endpoint Sample Config"
Cohesion: 0.22
Nodes (10): Adding Inspection, Architecture Diagram, Deployment, Functional Description, Exploring inspection, Exploring this example, Resources, Teardown (+2 more)

### Community 28 - "Central Egress Docs"
Cohesion: 0.20
Nodes (10): sample-central-egress.vpcBuilder, global, providers, transitGateways, vpcs, items, type, blackholeCidrs (+2 more)

### Community 29 - "Complex Sample Docs"
Cohesion: 0.20
Nodes (10): type, items, type, properties, amazonSideAsn, blackholeRoutes, tgwDescription, useExistingTgwId (+2 more)

### Community 30 - "Existing VPC Route53"
Cohesion: 0.25
Nodes (9): Architecture Diagram, Deployment, Functional Description, Exploration, Resources, Teardown, Sample Complex, region (+1 more)

### Community 31 - "Parser Tests"
Cohesion: 0.22
Nodes (9): IConfigProviderRoute53EndpointsForExistingVpcs, additionalProperties, properties, required, type, type, name, vpcId (+1 more)

### Community 32 - "Dev Dependencies"
Cohesion: 0.25
Nodes (4): IConfig, avj, IConfigParserProps, IPCidr

### Community 33 - "GitHub Node Workflow"
Cohesion: 0.22
Nodes (9): devDependencies, aws-cdk, jest, ts-jest, ts-node, @types/jest, @types/node, typescript (+1 more)

### Community 34 - "Contribution Docs"
Cohesion: 0.32
Nodes (7): This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node, For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions, bin, vpc-builder, prettier, name, version

### Community 35 - "Static Route Lambda"
Cohesion: 0.33
Nodes (7): Code of Conduct, Contributing Guidelines, Contributing via Pull Requests, Finding contributions to work on, Licensing, Reporting Bugs/Feature Requests, Security issue notifications

### Community 36 - "DNS Existing VPC Schema"
Cohesion: 0.43
Nodes (6): client, createTransitGatewayStaticRoute(), deleteTransitGatewayStaticRoute(), onEvent(), replaceTransitGatewayRoute(), ICustomResourceTGWStaticRoute

### Community 37 - "DNS Hosted Zones"
Cohesion: 0.29
Nodes (7): IConfigDnsShareWithExistingVpc, additionalProperties, properties, required, type, vpcRegion, type

### Community 38 - "Package Scripts"
Cohesion: 0.40
Nodes (4): IConfigDnsShareWithExistingVpc, IDnsEntriesProps, IDnsRoute53PrivateHostedZonesProps, IPrivateZoneName

### Community 39 - "Provider Endpoints Schema"
Cohesion: 0.33
Nodes (6): scripts, build, cdk, discoverEndpoints, test, watch

### Community 40 - "Provider Firewall Schema"
Cohesion: 0.50
Nodes (4): IConfigProviderFirewall, additionalProperties, required, type

### Community 41 - "TGW Default Routes"
Cohesion: 0.50
Nodes (4): IConfigProviderInternet, additionalProperties, required, type

### Community 42 - "TGW Routes Schema"
Cohesion: 0.50
Nodes (4): IConfigTgwDefaultRoutes, additionalProperties, required, type

### Community 43 - "VPN Tunnel Schema"
Cohesion: 0.50
Nodes (4): IConfigTgwRoutes, additionalProperties, required, type

### Community 44 - "Standalone Stack Tests"
Cohesion: 0.50
Nodes (4): IConfigVpnTunnelOptions, additionalProperties, required, type

### Community 46 - "Named Endpoints Schema"
Cohesion: 0.67
Nodes (3): IConfigDns, additionalProperties, type

### Community 47 - "Internet Provider Schema"
Cohesion: 0.67
Nodes (3): IConfigProviderEndpointsNamed, additionalProperties, type

### Community 48 - "TGW Peers Schema"
Cohesion: 0.67
Nodes (3): IConfigProviderInternetNamed, additionalProperties, type

### Community 49 - "NAT Strategy Schema"
Cohesion: 0.67
Nodes (3): IConfigTgwPeers, additionalProperties, type

### Community 50 - "VPC Style Schema"
Cohesion: 0.67
Nodes (3): IConfigVpcNatGatewayStrategy, enum, type

### Community 51 - "Code Of Conduct"
Cohesion: 0.67
Nodes (3): IConfigVpcStyles, enum, type

## Knowledge Gaps
- **376 isolated node(s):** `client`, `client`, `$schema`, `additionalProperties`, `type` (+371 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `definitions` connect `Schema Definitions` to `Config Walkthrough`, `StrongSwan Routes`, `DNS Schema`, `Sample Config Docs`, `Config Schema Root`, `Endpoint Style Schema`, `Provider Type Schema`, `Global Config Schema`, `Complex Config Sample`, `Parser Tests`, `DNS Hosted Zones`, `Provider Firewall Schema`, `TGW Default Routes`, `TGW Routes Schema`, `VPN Tunnel Schema`, `Standalone Stack Tests`, `Named Endpoints Schema`, `Internet Provider Schema`, `TGW Peers Schema`, `NAT Strategy Schema`, `VPC Style Schema`, `Code Of Conduct`?**
  _High betweenness centrality (0.235) - this node is a cross-community bridge._
- **Why does `TransitGateway` connect `Transit Gateway Stacks` to `Egress Samples`, `Firewall VPN Samples`, `README Overview`, `Runtime Dependencies`, `Central Egress Docs`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Why does `BuilderVpc` connect `VPC Builder Core` to `Egress Samples`, `Stack Builder Config`, `Gateway Builders`, `Standalone Endpoints`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **What connects `client`, `client`, `$schema` to the rest of the system?**
  _376 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `VPC Builder Core` be split into smaller, more focused modules?**
  _Cohesion score 0.054871220604703244 - nodes in this community are weakly interconnected._
- **Should `Stack Builder Config` be split into smaller, more focused modules?**
  _Cohesion score 0.05540499849442939 - nodes in this community are weakly interconnected._
- **Should `Gateway Builders` be split into smaller, more focused modules?**
  _Cohesion score 0.06625258799171843 - nodes in this community are weakly interconnected._