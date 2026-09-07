import {
  buildCloudFormationStackName,
  CLOUDFORMATION_STACK_NAME_MAX_LENGTH,
} from "../lib/name-utils";

test("ShortStackNameUnchanged", () => {
  expect(buildCloudFormationStackName("alzb123", "workload")).toEqual(
    "alzb123-workload"
  );
});

test("LongStackNameIsCappedWithHashSuffix", () => {
  const stackName = buildCloudFormationStackName(
    "prefix".repeat(24),
    "stack".repeat(20)
  );

  expect(stackName).toHaveLength(CLOUDFORMATION_STACK_NAME_MAX_LENGTH);
  expect(stackName.endsWith("cd4b")).toBe(true);
});

test("LongStackNamesWithDifferentTailsStayUnique", () => {
  const first = buildCloudFormationStackName(
    "prefix".repeat(24),
    "stack".repeat(20)
  );
  const second = buildCloudFormationStackName(
    "prefix".repeat(24),
    "other".repeat(20)
  );

  expect(first).not.toEqual(second);
  expect(second.endsWith("709d")).toBe(true);
});
