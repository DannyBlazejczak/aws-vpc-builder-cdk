import * as crypto from "crypto";

export const CLOUDFORMATION_STACK_NAME_MAX_LENGTH = 128;
export const RAM_RESOURCE_SHARE_NAME_MAX_LENGTH = 255;

export function buildCloudFormationStackName(
  stackNamePrefix: string,
  stackName: string
): string {
  return truncateWithHash(
    `${stackNamePrefix}-${stackName}`.toLowerCase(),
    CLOUDFORMATION_STACK_NAME_MAX_LENGTH
  );
}

export function ramResourceShareName(
  vpcName: string,
  subnetName: string,
  subnetType: string
): string {
  return truncateWithHash(
    `Share-${vpcName}-${subnetName.toLowerCase()}-${toKebabCase(subnetType)}`,
    RAM_RESOURCE_SHARE_NAME_MAX_LENGTH,
    "-"
  );
}

function truncateWithHash(
  name: string,
  maxLength: number,
  hashSeparator: string = ""
): string {
  if (name.length <= maxLength) return name;

  const hash = crypto.createHash("sha256").update(name).digest("hex").slice(0, 4);
  return `${name.slice(0, maxLength - hash.length - hashSeparator.length)}${hashSeparator}${hash}`;
}

function toKebabCase(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
