import { NextResponse } from 'next/server';
import { z } from 'zod';
import { TriggerCollector } from '@/use-cases/TriggerCollector';
import { CareRouteError } from '@/domain/errors';

const RequestSchema = z.object({
  collectorId: z.string().min(1, 'collectorId is required'),
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

    const { collectorId } = parsed.data;
    const result = await TriggerCollector.execute(collectorId);

    return NextResponse.json({
      success: true,
      snapshotId: result.snapshotId,
      runId: result.runId,
    });
  } catch (err) {
    if (err instanceof CareRouteError) {
      return NextResponse.json(
        { error: err.message, code: err.code, metadata: err.metadata },
        { status: err.statusCode }
      );
    }

    console.error('Unhandled internal error in trigger collection:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
