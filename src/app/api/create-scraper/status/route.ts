import { NextResponse } from 'next/server';
import { z } from 'zod';
import { CheckScraperStatus } from '@/use-cases/CheckScraperStatus';
import { CareRouteError } from '@/domain/errors';

const QuerySchema = z.object({
  collectorId: z.string().min(1, 'collectorId is required'),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = QuerySchema.safeParse({ collectorId: searchParams.get('collectorId') });

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const progress = await CheckScraperStatus.execute(parsed.data.collectorId);

    return NextResponse.json(progress);
  } catch (err) {
    if (err instanceof CareRouteError) {
      return NextResponse.json(
        { error: err.message, code: err.code, metadata: err.metadata },
        { status: err.statusCode }
      );
    }

    console.error('Unhandled internal error in scraper status:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
