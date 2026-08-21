import { z } from 'zod';

export const DiscoveryJobStateSchema = z.enum([
  'queued',
  'discovering', // Identifying if we can reuse or need to generate collector
  'collector_generation', // Waiting for AI Flow
  'collecting', // Running the collector
  'validating', // Verifying scraped results
  'completed', // Everything successfully ingested
  'failed', // Terminal failure
  'retryable', // Transient failure
]);
export type DiscoveryJobState = z.infer<typeof DiscoveryJobStateSchema>;

export const DiscoveryJobSchema = z.object({
  id: z.string().uuid(),
  cellId: z.string(),
  state: DiscoveryJobStateSchema,
  collectorId: z.string().nullable(),
  collectionRunId: z.string().nullable(),
  facilitiesDiscovered: z.number().int().nonnegative().default(0),
  searchContext: z.string(), // JSON string representing what we were looking for
  errorMessage: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type DiscoveryJob = z.infer<typeof DiscoveryJobSchema>;

/**
 * Domain logic to determine if a state transition for a discovery job is valid.
 */
export function isValidDiscoveryTransition(
  current: DiscoveryJobState,
  next: DiscoveryJobState
): boolean {
  const transitions: Record<DiscoveryJobState, DiscoveryJobState[]> = {
    queued: ['discovering', 'failed'],
    discovering: ['collector_generation', 'collecting', 'failed'],
    collector_generation: ['collecting', 'failed'],
    collecting: ['validating', 'failed'],
    validating: ['completed', 'failed'],
    completed: [], // Terminal
    failed: ['retryable'],
    retryable: ['queued'],
  };

  return transitions[current].includes(next);
}
