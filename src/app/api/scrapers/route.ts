import { NextResponse } from 'next/server';
import { ScraperRepository } from '@/infrastructure/db/repositories/scrapers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const scrapers = ScraperRepository.findAll();
    return NextResponse.json(scrapers);
  } catch (error) {
    console.error('Failed to fetch scrapers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
