import { NextResponse } from 'next/server';
import { ScraperService } from '@/lib/services/scraper.service';

export async function POST(request: Request) {
  try {
    const { collectorId } = await request.json();

    if (!collectorId) {
      return NextResponse.json({ error: 'collectorId is required' }, { status: 400 });
    }

    const result = await ScraperService.runScraper(collectorId);

    return NextResponse.json({ success: true, snapshotId: result.snapshotId, runId: result.runId });

  } catch (err: any) {
    console.error('Trigger collection error', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
