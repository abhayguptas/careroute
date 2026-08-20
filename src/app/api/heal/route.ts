import { NextResponse } from 'next/server';
import { z } from 'zod';
import { HealScraper } from '@/use-cases/HealScraper';
import { CareRouteError } from '@/domain/errors';

const HealRequestSchema = z
  .object({
    action: z.enum(['trigger', 'poll', 'approve']),
    scraperId: z.string().uuid(),
    prompt: z.string().optional(),
    url: z.string().url().optional(),
  })
  .refine(
    (data) => {
      if (data.action === 'trigger' && (!data.prompt || !data.url)) {
        return false;
      }
      return true;
    },
    { message: "Prompt and URL are required for 'trigger' action" }
  );

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const parsed = HealRequestSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const { action, scraperId, prompt, url } = parsed.data;

    if (action === 'trigger') {
      if (!prompt || !url) {
        return NextResponse.json(
          { error: 'Prompt and URL are required for trigger' },
          { status: 400 }
        );
      }
      const attemptId = await HealScraper.trigger(scraperId, prompt, url);
      return NextResponse.json({ success: true, attemptId });
    }

    if (action === 'poll') {
      const progress = await HealScraper.poll(scraperId);
      return NextResponse.json(progress);
    }

    if (action === 'approve') {
      await HealScraper.approve(scraperId);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    if (err instanceof CareRouteError) {
      return NextResponse.json(
        { error: err.message, code: err.code, metadata: err.metadata },
        { status: err.statusCode }
      );
    }

    console.error('Unhandled internal error in heal API:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
