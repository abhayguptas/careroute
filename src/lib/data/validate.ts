export interface ValidationResult {
  healthy: boolean;
  fieldCompleteness: Record<string, number>;
  overallHealth: number;
  brokenFields: string[];
}

export function validateScrapeOutput(
  results: Record<string, any>[],
  requiredFields: string[]
): ValidationResult {
  if (!results || results.length === 0) {
    return {
      healthy: false,
      fieldCompleteness: {},
      overallHealth: 0,
      brokenFields: requiredFields,
    };
  }

  const fieldCompleteness: Record<string, number> = {};

  for (const field of requiredFields) {
    const populated = results.filter(
      (r) => r[field] !== null && r[field] !== undefined && r[field] !== ''
    ).length;
    fieldCompleteness[field] = populated / results.length;
  }

  const overallHealth =
    Object.values(fieldCompleteness).reduce((a, b) => a + b, 0) /
    requiredFields.length;

  return {
    healthy: overallHealth >= 0.7,
    fieldCompleteness,
    overallHealth,
    brokenFields: requiredFields.filter((f) => fieldCompleteness[f] < 0.5),
  };
}
