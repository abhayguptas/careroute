import { z } from 'zod';

export const ScraperStatusSchema = z.enum(['creating', 'ready', 'running', 'broken', 'healing']);
export type ScraperStatus = z.infer<typeof ScraperStatusSchema>;

export const EvidenceSchema = z.object({
  sourceUrl: z.string().url(),
  extractedAt: z.string().datetime(),
  provenance: z.string(), // Description of how/where it was found
});
export type Evidence = z.infer<typeof EvidenceSchema>;

export const ScraperEntitySchema = z.object({
  id: z.string().uuid(),
  collectorId: z.string(),
  name: z.string(),
  targetUrl: z.string().url(),
  description: z.string(),
  status: ScraperStatusSchema,
  requiredFields: z.array(z.string()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type ScraperEntity = z.infer<typeof ScraperEntitySchema>;

export const ScrapeRunSchema = z.object({
  id: z.string().uuid(),
  scraperId: z.string().uuid(),
  snapshotId: z.string(),
  status: z.enum(['running', 'completed', 'failed']),
  recordCount: z.number().int().nonnegative(),
  healthStatus: z.enum(['healthy', 'degraded', 'broken', 'unknown']),
  missingFields: z.array(z.string()),
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime().nullable(),
});
export type ScrapeRun = z.infer<typeof ScrapeRunSchema>;

// Domain Logic
export function isValidStateTransition(current: ScraperStatus, next: ScraperStatus): boolean {
  const transitions: Record<ScraperStatus, ScraperStatus[]> = {
    creating: ['ready', 'broken'],
    ready: ['running', 'broken'],
    running: ['ready', 'broken'],
    broken: ['healing'],
    healing: ['ready', 'broken'],
  };
  return transitions[current].includes(next);
}
