import { BrightDataAdapter } from '../infrastructure/brightdata/adapter';
import { ScraperRepository } from '../infrastructure/db/repositories/scrapers';
import { DomainStateError } from '../domain/errors';
import crypto from 'crypto';

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

    // Security: Strict URL validation to prevent SSRF and malicious onboarding
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        throw new Error('Invalid protocol');
      }
      // Extremely basic localhost guard (a full production SSRF guard would resolve DNS)
      if (parsedUrl.hostname === 'localhost' || parsedUrl.hostname.startsWith('127.')) {
        throw new Error('Localhost not allowed');
      }
    } catch {
      throw new DomainStateError('Invalid public URL provided');
    }

    const normalizedUrl = parsedUrl.toString();

    // Idempotency: Prevent duplicate scrapers for the same target URL to avoid cost amplification
    const existing = ScraperRepository.findByTargetUrl(normalizedUrl);
    if (existing) {
      return {
        id: existing.id,
        collectorId: existing.collectorId,
      };
    }

    const webhookSecret = crypto.randomBytes(32).toString('hex');
    const baseUrl = process.env.WEBHOOK_BASE_URL || 'https://example.com';
    // We cannot pass collectorId in webhook creation because we don't have it yet!
    // But BrightData will pass collection_id or dataset_id in the payload, and we can configure it in Trigger.
    // Wait, the deliver.endpoint is static per scraper. We CAN pass a scraper-specific ID if we generate our own ID first!
    const scraperId = crypto.randomUUID();
    const webhookUrl = `${baseUrl}/api/webhooks/brightdata?scraper_id=${scraperId}&secret=${webhookSecret}`;

    // 1. Provision Collector (Infrastructure)
    const collectorId = await BrightDataAdapter.createCollector(name, webhookUrl);

    // 2. Trigger AI Flow (Infrastructure)
    await BrightDataAdapter.triggerAIGeneration(collectorId, normalizedUrl, this.DEFAULT_AI_PROMPT);

    // 3. Persist Initial State (Infrastructure DB)
    const scraper = ScraperRepository.create({
      id: scraperId,
      collectorId,
      name,
      targetUrl: normalizedUrl,
      description: this.DEFAULT_AI_PROMPT,
      status: 'queued', // From Domain logic
      generationStatus: 'generating', // Active generation
      schemaVersion: '1.0',
      webhookSecret,
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
