import { NextResponse } from 'next/server';
import { ScraperService } from '@/lib/services/scraper.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const collectorId = searchParams.get('collectorId');

    if (!collectorId) {
      return NextResponse.json({ error: 'collectorId is required' }, { status: 400 });
    }

    const progress = await ScraperService.checkStatusAndUpdate(collectorId);

    return NextResponse.json(progress);
  } catch (err) {
    console.error('Poll scraper status error', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
