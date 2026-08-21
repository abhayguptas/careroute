import { NextResponse } from 'next/server';
import { RequestCoverageExpansion } from '@/use-cases/RequestCoverageExpansion';
import { DiscoveryRepository } from '@/infrastructure/db/repositories/discovery';
import { latLngToCell } from '@/lib/geo/h3';

export async function POST(req: Request) {
  try {
    const { lat, lng, cellId, searchContext } = await req.json();

    let targetCell = cellId;
    if (!targetCell && lat !== undefined && lng !== undefined) {
      targetCell = latLngToCell(lat, lng);
    }

    if (!targetCell) {
      return NextResponse.json({ error: 'Cell ID or lat/lng required' }, { status: 400 });
    }

    const jobId = await RequestCoverageExpansion.execute(targetCell, searchContext);

    return NextResponse.json({ jobId, cellId: targetCell });
  } catch (error) {
    console.error('Coverage expansion request error:', error);
    return NextResponse.json(
      { error: 'Internal server error requesting expansion' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      // If no ID, return all active jobs
      const discovering = DiscoveryRepository.findByState('discovering');
      const generating = DiscoveryRepository.findByState('collector_generation');
      const collecting = DiscoveryRepository.findByState('collecting');
      
      return NextResponse.json({
        activeJobs: [...discovering, ...generating, ...collecting]
      });
    }

    const job = DiscoveryRepository.findById(jobId);
    
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error('Discovery job fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
