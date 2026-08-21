import { z } from 'zod';
import { env } from '../../domain/env';
import { InfrastructureError } from '../../domain/errors';

// -----------------------------------------------------------------------------
// Bright Data API Responses (Untrusted boundary - validated by Zod)
// -----------------------------------------------------------------------------

const CollectorCreateResponseSchema = z.object({
  id: z.string(),
});

const AIProgressResponseSchema = z.object({
  status: z.enum(['running', 'pending_answer', 'completed', 'failed']),
  diff: z.any().optional(), // We don't parse the diff deeply for now
});

const TriggerCollectionResponseSchema = z.object({
  collection_id: z.string(),
});

// -----------------------------------------------------------------------------
// Adapter Class
// -----------------------------------------------------------------------------

export class BrightDataAdapter {
  private static BASE_URL = 'https://api.brightdata.com/dca';

  private static getHeaders(): HeadersInit {
    return {
      Authorization: `Bearer ${env.BRIGHT_DATA_TOKEN}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Internal wrapper for `fetch` that standardizes error handling.
   * Transforms network errors or non-2xx responses into InfrastructureError.
   */
  private static async request(endpoint: string, options: RequestInit = {}): Promise<unknown> {
    const url = `${this.BASE_URL}${endpoint}`;
    let response: Response;

    try {
      response = await fetch(url, {
        ...options,
        headers: { ...this.getHeaders(), ...options.headers },
      });
    } catch (error) {
      throw new InfrastructureError(
        `Network failure calling Bright Data: ${(error as Error).message}`,
        { url, endpoint }
      );
    }

    if (!response.ok) {
      let errorBody = '';
      try {
        errorBody = await response.text();
      } catch {
        /* ignore */
      }

      throw new InfrastructureError(`Bright Data API rejected the request`, {
        url,
        status: response.status,
        body: errorBody,
      });
    }

    // Assuming JSON responses for DCA API
    try {
      return await response.json();
    } catch {
      throw new InfrastructureError(`Failed to parse Bright Data response as JSON`, { url });
    }
  }

  // ---------------------------------------------------------------------------
  // External Domain Methods
  // ---------------------------------------------------------------------------

  /**
   * Provisions a new empty collector entity in Bright Data.
   */
  static async createCollector(name: string, webhookUrl: string): Promise<string> {
    const rawData = await this.request('/collector', { 
      method: 'POST',
      body: JSON.stringify({
        name,
        deliver: {
          type: 'webhook',
          endpoint: webhookUrl
        }
      })
    });
    
    const parsed = CollectorCreateResponseSchema.safeParse(rawData);

    if (!parsed.success) {
      throw new InfrastructureError('Unexpected response shape when creating collector', {
        issues: parsed.error.issues,
        rawData,
      });
    }

    return parsed.data.id;
  }

  /**
   * Commands the Bright Data AI Agent to write extraction logic for a URL based on a prompt.
   */
  static async triggerAIGeneration(
    collectorId: string,
    url: string,
    prompt: string
  ): Promise<void> {
    // Note: 'prompt' parameter is not supported by the automate_template endpoint for this type of collector.
    // The Bright Data AI relies on the URL to build the scraper.
    await this.request(`/collectors/${collectorId}/automate_template`, {
      method: 'POST',
      body: JSON.stringify({ urls: [url] }),
    });
  }

  /**
   * Polls the status of an ongoing AI code-generation job.
   */
  static async pollAIProgress(collectorId: string) {
    const rawData = await this.request(`/collectors/${collectorId}/automate_template/progress`);
    const parsed = AIProgressResponseSchema.safeParse(rawData);

    if (!parsed.success) {
      throw new InfrastructureError('Unexpected response shape when polling AI progress', {
        issues: parsed.error.issues,
        rawData,
      });
    }

    return parsed.data;
  }

  /**
   * Triggers a live collection run for an existing scraper.
   */
  static async triggerCollection(collectorId: string, url: string, webhookUrl?: string): Promise<string> {
    let endpoint = `/collectors/${collectorId}/trigger?queue_next=1`;
    
    if (webhookUrl) {
      const notify = JSON.stringify({ type: 'webhook', endpoint: webhookUrl });
      endpoint += `&notify=${encodeURIComponent(notify)}`;
    }

    const rawData = await this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify([{ url }]),
    });

    const parsed = TriggerCollectionResponseSchema.safeParse(rawData);

    if (!parsed.success) {
      throw new InfrastructureError('Unexpected response shape when triggering collection', {
        issues: parsed.error.issues,
        rawData,
      });
    }

    return parsed.data.collection_id;
  }
}
