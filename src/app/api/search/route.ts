import { NextResponse } from 'next/server';
import { SearchCare } from '@/use-cases/SearchCare';

export async function POST(req: Request) {
  try {
    const { query, location } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const { intent, results, coverageStatus } = await SearchCare.execute(query, location);

    return NextResponse.json({
      intent,
      coverageStatus,
      results,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error during search' },
      { status: 500 }
    );
  }
}
