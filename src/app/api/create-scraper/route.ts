import { NextResponse } from 'next/server';
import { ScraperService } from '@/lib/services/scraper.service';

export async function POST(request: Request) {
  try {
    const { url, name } = await request.json();

    if (!url || !name) {
      return NextResponse.json({ error: 'URL and name are required' }, { status: 400 });
    }

    const { id, collectorId } = await ScraperService.onboardFacility(url, name);

    return NextResponse.json({ success: true, id, collectorId });
  } catch (err) {
    console.error('Create scraper error', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
