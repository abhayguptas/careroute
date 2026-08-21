import { NextResponse } from 'next/server';
import { ProcessDiscoveryJob } from '@/use-cases/ProcessDiscoveryJob';

export async function POST(req: Request) {
  try {
    const { jobId } = await req.json();

    if (!jobId) {
      return NextResponse.json({ error: 'jobId is required' }, { status: 400 });
    }

    // In a real application, this endpoint would be hit by a cron or worker queue.
    // We execute the process job synchronously here for the hackathon demo.
    const result = await ProcessDiscoveryJob.execute(jobId);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Discovery job process error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing discovery job' },
      { status: 500 }
    );
  }
}
