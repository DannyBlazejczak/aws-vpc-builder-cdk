import * as crypto from "crypto";

export const CLOUDFORMATION_STACK_NAME_MAX_LENGTH = 128;

export function buildCloudFormationStackName(
  stackNamePrefix: string,
  stackName: string
): string {
  const name = `${stackNamePrefix}-${stackName}`.toLowerCase();
  if (name.length <= CLOUDFORMATION_STACK_NAME_MAX_LENGTH) return name;

  const hash = crypto.createHash("sha256").update(name).digest("hex").slice(0, 4);
  return `${name.slice(0, CLOUDFORMATION_STACK_NAME_MAX_LENGTH - hash.length)}${hash}`;
}
