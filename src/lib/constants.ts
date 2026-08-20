export const CARE_ROUTE_REQUIRED_SCHEMA = [
  'facility_name',
  'facility_type',
  'address',
  'phone',
  'emergency_available',
  'emergency_hours',
  'departments',
  'specialties',
  'ambulance_available',
  'blood_bank',
  'icu',
  'trauma_services',
  'opd_hours',
  'appointment_url',
  'government_or_private',
  'source_urls',
  'last_verified'
];

export const CARE_ROUTE_AI_PROMPT = `
  Extract the following fields for this healthcare facility:
  - facility_name
  - facility_type (e.g. clinic, hospital, government, private)
  - address
  - phone
  - emergency_available (boolean)
  - emergency_hours
  - departments (list)
  - specialties (list)
  - ambulance_available (boolean)
  - blood_bank (boolean)
  - icu (boolean)
  - trauma_services (boolean)
  - opd_hours
  - appointment_url
  - government_or_private
  - source_urls
  - last_verified
`;
