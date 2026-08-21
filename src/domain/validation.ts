export type FieldHealth = 'healthy' | 'degraded' | 'missing' | 'unknown';

export interface ScraperHealthStatus {
  overallHealth: 'healthy' | 'degraded' | 'broken';
  fieldHealth: Record<string, FieldHealth>;
  missingFields: string[];
}

export function validateExtractionQuality(
  record: Record<string, unknown>,
  requiredFields: string[]
): ScraperHealthStatus {
  const fieldHealth: Record<string, FieldHealth> = {};
  const missingFields: string[] = [];

  for (const field of requiredFields) {
    const value = record[field];
    if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
      fieldHealth[field] = 'missing';
      missingFields.push(field);
    } else {
      fieldHealth[field] = 'healthy';
    }
  }

  let overallHealth: 'healthy' | 'degraded' | 'broken' = 'healthy';
  if (requiredFields.length > 0) {
    const missingRatio = missingFields.length / requiredFields.length;

    if (missingRatio >= 0.5) {
      overallHealth = 'broken';
    } else if (missingRatio > 0) {
      overallHealth = 'degraded';
    }
  }

  return {
    overallHealth,
    fieldHealth,
    missingFields,
  };
}
