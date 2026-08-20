import { z } from 'zod';
import { DomainStateError } from './errors';

// Strictly typed facility schema
export const FacilitySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1),
  address: z.string().min(1),
  type: z.string().nullable().default(null),
  emergencyAvailable: z.boolean().default(false),
  departments: z.array(z.string()).default([]),
  contactPhone: z.string().nullable().default(null),
  sourceUrl: z.string().url(),
  lastVerifiedAt: z.string().datetime(),
});
export type Facility = z.infer<typeof FacilitySchema>;

// Health evaluation result
export const ValidationResultSchema = z.object({
  healthy: z.boolean(),
  fieldCompleteness: z.record(z.string(), z.number()),
  overallHealth: z.number().min(0).max(1),
  brokenFields: z.array(z.string()),
});
export type ValidationResult = z.infer<typeof ValidationResultSchema>;

/**
 * Validates untrusted scraper output against a set of required fields.
 * Extracted from the loose Record<string, any> approach to a domain invariant.
 */
export function evaluateScraperHealth(
  results: unknown[],
  requiredFields: string[]
): ValidationResult {
  if (!Array.isArray(results) || results.length === 0) {
    return {
      healthy: false,
      fieldCompleteness: {},
      overallHealth: 0,
      brokenFields: requiredFields,
    };
  }

  const fieldCompleteness: Record<string, number> = {};

  for (const field of requiredFields) {
    const populated = results.filter((r) => {
      if (typeof r !== 'object' || r === null) return false;
      const val = (r as Record<string, unknown>)[field];
      return val !== null && val !== undefined && val !== '';
    }).length;
    fieldCompleteness[field] = populated / results.length;
  }

  const overallHealth =
    requiredFields.length > 0
      ? Object.values(fieldCompleteness).reduce((a, b) => a + b, 0) / requiredFields.length
      : 1;

  // A scraper is healthy if overall completeness is >= 70%
  const healthy = overallHealth >= 0.7;

  return {
    healthy,
    fieldCompleteness,
    overallHealth,
    brokenFields: requiredFields.filter((f) => fieldCompleteness[f] < 0.5),
  };
}
