export interface Facility {
  id: string;
  name: string;
  type: string;
  city: string;
  address: string | null;
  phone: string | null;
  emergencyPhone: string | null;
  emergencyAvailable: boolean;
  emergencyHours: string | null;
  services: string; // JSON string array
  departments: string; // JSON string array
  sourceUrl: string;
  lastScrapedAt: string;
  scraperId: string;
  evidence: string; // JSON string array
  latitude: number;
  longitude: number;
}

export interface RegisteredScraper {
  id: string;
  collectorId: string;
  name: string;
  targetUrl: string;
  description: string;
  status: 'creating' | 'ready' | 'broken' | 'healing';
  requiredFields: string; // JSON string array
  lastHealthy: number;
  createdAt: string;
}

export interface ScrapeRun {
  id: string;
  scraperId: string;
  snapshotId: string;
  status: string;
  recordCount: number;
  healthStatus: string;
  missingFields: string;
  startedAt: string;
}

export interface HealingAttempt {
  id: string;
  scraperId: string;
  prompt: string;
  status: string;
  fieldsBeforeHeal: string;
  fieldsAfterHeal: string;
  attempt: number;
  triggeredAt: string;
  resolvedAt: string | null;
}
