import { z } from 'zod';
import { ValidationError } from './errors';

const envSchema = z.object({
  BRIGHT_DATA_TOKEN: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  // Add other env vars here as needed
});

/**
 * Validates the current environment variables against the schema.
 * Parses at runtime and throws a specific ValidationError if invalid.
 */
export function validateEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ');
    throw new ValidationError(`Environment validation failed: ${issues}`, {
      issues: parsed.error.issues,
    });
  }

  return parsed.data;
}

// Export the inferred type for use across the application
export type EnvConfig = z.infer<typeof envSchema>;

// Export a singleton instance of the validated env
export const env = validateEnv();
