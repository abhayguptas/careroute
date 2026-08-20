import { BrightDataAdapter } from '../infrastructure/brightdata/adapter';
import { ScraperRepository } from '../infrastructure/db/repositories/scrapers';
import { DomainStateError } from '../domain/errors';

export class OnboardFacility {
  private static DEFAULT_AI_PROMPT = `
You are a healthcare intelligence extractor. Find exactly this information:
1. Facility name (string)
2. Address (string)
3. Available departments (array of strings)
4. Emergency available (boolean, true if 24/7 emergency/trauma exists)
Return strictly JSON matching this structure.
`;

  /**
   * Orchestrates the autonomous onboarding of a new facility.
   * Uses the Bright Data adapter to provision a collector, triggers AI Flow,
   * and persists the initial domain state.
   */
  static async execute(url: string, name: string) {
    if (!url || !name) {
      throw new DomainStateError('URL and name are required for onboarding');
    }

    // 1. Provision Collector (Infrastructure)
    const collectorId = await BrightDataAdapter.createCollector();

    // 2. Trigger AI Flow (Infrastructure)
    await BrightDataAdapter.triggerAIGeneration(collectorId, url, this.DEFAULT_AI_PROMPT);

    // 3. Persist Initial State (Infrastructure DB)
    const scraper = ScraperRepository.create({
      collectorId,
      name,
      targetUrl: url,
      description: this.DEFAULT_AI_PROMPT,
      status: 'creating', // From Domain logic
      requiredFields: JSON.stringify([
        'facility_name',
        'address',
        'departments',
        'emergency_available',
      ]),
    });

    return {
      id: scraper.id,
      collectorId,
    };
  }
}
