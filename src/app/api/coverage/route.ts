import { NextResponse } from 'next/server';
import { CheckCoverage } from '@/use-cases/CheckCoverage';
import { parseUserLocation } from '@/lib/geo/location';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const latStr = searchParams.get('lat');
    const lngStr = searchParams.get('lng');
    const locationStr = searchParams.get('location');

    let lat: number, lng: number;

    if (latStr && lngStr) {
      lat = parseFloat(latStr);
      lng = parseFloat(lngStr);
    } else {
      const loc = parseUserLocation(locationStr);
      lat = loc.lat;
      lng = loc.lng;
    }

    if (isNaN(lat) || isNaN(lng)) {
      return NextResponse.json({ error: 'Invalid coordinates' }, { status: 400 });
    }

    const coverage = CheckCoverage.execute(lat, lng);
    
    return NextResponse.json(coverage);
  } catch (error) {
    console.error('Coverage check error:', error);
    return NextResponse.json(
      { error: 'Internal server error checking coverage' },
      { status: 500 }
    );
  }
}
