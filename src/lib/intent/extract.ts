import { StructuredIntent } from '../../types/search';

const EMERGENCY_KEYWORDS = [
  'urgent',
  'emergency',
  'accident',
  'trauma',
  'critical',
  'immediately',
  'heart attack',
  'stroke',
  'bleeding',
];
const CARE_KEYWORDS = ['checkup', 'consultation', 'doctor', 'routine', 'department', 'treatment'];

const SPECIALTY_MAPPING: Record<string, string> = {
  kidney: 'nephrology',
  dialysis: 'nephrology',
  heart: 'cardiology',
  bones: 'orthopedics',
  fracture: 'orthopedics',
  skin: 'dermatology',
  children: 'pediatrics',
  baby: 'pediatrics',
  eyes: 'ophthalmology',
  teeth: 'dentistry',
  dental: 'dentistry',
  brain: 'neurology',
  cancer: 'oncology',
  women: 'gynecology',
  pregnancy: 'gynecology',
};

const FACILITY_TYPES = ['government', 'private', 'clinic', 'institute'];

export function extractIntent(query: string, city: string = 'New Delhi'): StructuredIntent {
  const lowerQuery = query.toLowerCase();

  // 1. Determine Mode & Urgency
  let mode: 'emergency' | 'care' = 'care';
  let urgency: 'critical' | 'urgent' | 'routine' = 'routine';

  for (const kw of EMERGENCY_KEYWORDS) {
    if (lowerQuery.includes(kw)) {
      mode = 'emergency';
      urgency =
        kw === 'critical' || kw === 'heart attack' || kw === 'stroke' ? 'critical' : 'urgent';
      break;
    }
  }

  // 2. Extract Specialties
  const specialties = new Set<string>();
  for (const [kw, spec] of Object.entries(SPECIALTY_MAPPING)) {
    if (lowerQuery.includes(kw) || lowerQuery.includes(spec)) {
      specialties.add(spec);
    }
  }

  // 3. Extract Facility Type
  let facilityType: string | null = null;
  for (const ft of FACILITY_TYPES) {
    if (lowerQuery.includes(ft)) {
      facilityType = ft;
      break;
    }
  }

  return {
    mode,
    specialties: Array.from(specialties),
    facilityType,
    urgency,
    city,
    rawQuery: query,
  };
}
