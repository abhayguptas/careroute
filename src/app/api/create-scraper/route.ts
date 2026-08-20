import { NextResponse } from 'next/server';
import { z } from 'zod';
import { OnboardFacility } from '@/use-cases/OnboardFacility';
import { CareRouteError } from '@/domain/errors';

const RequestSchema = z.object({
  url: z.string().url('Must provide a valid URL'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const parsed = RequestSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const { url, name } = parsed.data;
    const { id, collectorId } = await OnboardFacility.execute(url, name);

    return NextResponse.json({ success: true, id, collectorId });
  } catch (err) {
    if (err instanceof CareRouteError) {
      return NextResponse.json(
        { error: err.message, code: err.code, metadata: err.metadata },
        { status: err.statusCode }
      );
    }

    // Fallback for unknown internal errors
    console.error('Unhandled internal error in create-scraper:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
