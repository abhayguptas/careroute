import { NextResponse } from 'next/server';
import { extractIntent } from '@/lib/intent/extract';
import { FacilityRepository } from '@/lib/db/repositories/facilities';
import { SearchResult } from '@/types/search';
import { distance as calculateDistance } from '@/lib/geo/distance';

export async function POST(request: Request) {
  try {
    const { query, location, latitude, longitude } = await request.json();
    
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // 1. Extract intent
    const cityStr = location || process.env.NEXT_PUBLIC_DEFAULT_CITY || 'New Delhi';
    const intent = extractIntent(query, cityStr);

    // 2. Fetch facilities from DB
    const facilities = FacilityRepository.findByCity(cityStr.split(',')[0].trim());

    // 3. Match and rank
    const results: SearchResult[] = [];
    const userLat = latitude || 28.6139; // Default to ND center if not provided
    const userLng = longitude || 77.2090;

    for (const facility of facilities) {
      const matchReasons: string[] = [];
      const missingCapabilities: string[] = [];
      let score = 0;

      // Parse JSON fields
      const services = JSON.parse(facility.services);
      
      // Mode logic
      if (intent.mode === 'emergency') {
        if (facility.emergencyAvailable) {
          score += 50;
          matchReasons.push('Has 24/7 Emergency Care');
        } else {
          missingCapabilities.push('No Emergency Department');
        }
      }

      // Specialty logic
      if (intent.specialties.length > 0) {
        for (const spec of intent.specialties) {
          if (services.includes(spec)) {
            score += 30;
            matchReasons.push(`Provides ${spec.charAt(0).toUpperCase() + spec.slice(1)}`);
          } else {
            missingCapabilities.push(`Missing ${spec.charAt(0).toUpperCase() + spec.slice(1)}`);
          }
        }
      }

      // Type logic
      if (intent.facilityType && facility.type.includes(intent.facilityType)) {
        score += 20;
        matchReasons.push(`${intent.facilityType.charAt(0).toUpperCase() + intent.facilityType.slice(1)} Facility`);
      }

      // Evidence bonus
      const evidence = JSON.parse(facility.evidence);
      if (evidence.length > 0) {
        score += 10; // Bonus for verified claims
      }

      // Calculate distance
      const dist = calculateDistance(userLat, userLng, facility.latitude, facility.longitude);
      
      // Penalty for distance
      score -= Math.min(dist * 2, 30); 

      // If it's a very poor match, skip
      if (score > 0 || (intent.mode === 'emergency' && facility.emergencyAvailable)) {
        results.push({
          facility,
          distance: Math.round(dist * 10) / 10,
          matchScore: score,
          matchReasons,
          missingCapabilities,
          verificationLevel: evidence.length > 0 ? 'high' : 'medium'
        });
      }
    }

    // Sort by score DESC
    results.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      intent,
      results
    });
    
  } catch (err) {
    console.error('Search error', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
