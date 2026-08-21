import { z } from 'zod';
import { COVERAGE_CONFIG } from '../lib/geo/coverage-config';

export const CoverageStateSchema = z.enum([
  'sufficient',
  'partial',
  'undiscovered',
  'discovering',
  'failed',
]);
export type CoverageState = z.infer<typeof CoverageStateSchema>;

export const GeoCoverageSchema = z.object({
  cellId: z.string(),
  facilityCount: z.number().int().nonnegative(),
  lastDiscoveryAt: z.string().datetime().nullable(),
  state: CoverageStateSchema,
  expansionJobId: z.string().nullable(),
  updatedAt: z.string().datetime(),
});
export type GeoCoverage = z.infer<typeof GeoCoverageSchema>;

/**
 * Heuristic to determine if a geographic cell is sufficiently covered by our healthcare dataset.
 *
 * It checks if we have enough facilities (e.g. >= 5) and if the data is recent enough (e.g. < 72h).
 */
export function evaluateCoverage(
  facilityCount: number,
  lastDiscoveryAt: string | null
): CoverageState {
  if (facilityCount === 0 && !lastDiscoveryAt) {
    return 'undiscovered';
  }

  if (facilityCount >= COVERAGE_CONFIG.minFacilitiesForSufficient) {
    if (lastDiscoveryAt) {
      const lastDiscovery = new Date(lastDiscoveryAt).getTime();
      const ageHours = (Date.now() - lastDiscovery) / (1000 * 60 * 60);

      if (ageHours <= COVERAGE_CONFIG.freshnessHours) {
        return 'sufficient';
      }
    }
    // If it's stale, we still have data, but it's partially reliable
    return 'partial';
  }

  return 'partial';
}
