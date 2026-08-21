import { NextResponse } from 'next/server';
import { IngestCollectorResult } from '@/use-cases/IngestCollectorResult';
import { ScraperRepository } from '@/infrastructure/db/repositories/scrapers';
import db from '@/infrastructure/db/connection';

// Note: Bright Data sends an array of results for each dataset/trigger
export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const collectorId = url.searchParams.get('collector_id');
    const secret = url.searchParams.get('secret');
    const runId = url.searchParams.get('run_id');

    if (!collectorId || !secret || !runId) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const scraper = ScraperRepository.findById(collectorId);
    if (!scraper) {
      return NextResponse.json({ error: 'Scraper not found' }, { status: 404 });
    }

    // Security: Validate the webhook secret to prevent unauthorized data injection
    if (scraper.webhookSecret !== secret) {
      return NextResponse.json({ error: 'Unauthorized webhook request' }, { status: 401 });
    }

    const payload = await request.json();
    
    if (!Array.isArray(payload)) {
      return NextResponse.json({ error: 'Expected array payload' }, { status: 400 });
    }

    const requiredFields = JSON.parse(scraper.requiredFields || '[]');

    // Wrap the entire ingestion and status update in a transaction for atomicity
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ingestTransaction = db.transaction((payload: any[], scraperId: string, runId: string, requiredFields: string[]) => {
      // 1. Ingest the raw result
      const result = IngestCollectorResult.execute(payload, scraperId, requiredFields);

      // 2. Update the exact scrape run record
      db.prepare(`
        UPDATE scrape_runs 
        SET status = ?, 
            completedAt = ?, 
            recordCount = ?, 
            healthStatus = ?, 
            missingFields = ?,
            extractionQuality = ?
        WHERE id = ? AND scraperId = ? AND status = 'running'
      `).run(
        'completed',
        new Date().toISOString(),
        result.processed,
        result.brokenCount > 0 ? (result.overallQuality > 0.5 ? 'degraded' : 'broken') : 'healthy',
        '[]', // In a real app we'd serialize the missing fields per run
        result.overallQuality,
        runId,
        scraperId
      );

      return result;
    });

    const result = ingestTransaction(payload, scraper.id, runId, requiredFields);

    // If health is bad, we might trigger an alert or state transition
    if (result.overallQuality < 0.5) {
      ScraperRepository.updateStatus(collectorId, 'failed');
    } else if (result.overallQuality < 1.0) {
      ScraperRepository.updateStatus(collectorId, 'needs_attention');
    } else {
      ScraperRepository.updateStatus(collectorId, 'ready');
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Webhook processing failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
