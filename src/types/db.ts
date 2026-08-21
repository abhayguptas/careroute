import { ScraperStatus } from '@/domain/scraper';

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
  h3Cell: string | null;
}

export interface RegisteredScraper {
  id: string;
  collectorId: string;
  name: string;
  targetUrl: string;
  description: string;
  status: ScraperStatus;
  requiredFields: string; // JSON string array
  lastHealthy: number;
  createdAt: string;
  generationStatus: string;
  webhookSecret: string | null;
  schemaVersion: string | null;
}

export interface ScrapeRun {
  id: string;
  scraperId: string;
  snapshotId: string;
  status: 'running' | 'completed' | 'failed';
  recordCount: number;
  healthStatus: string;
  missingFields: string;
  startedAt: string;
  completedAt: string | null;
  webhookDeliveryId: string | null;
  extractionQuality: number | null;
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

export interface GeoCoverageRecord {
  cellId: string;
  facilityCount: number;
  lastDiscoveryAt: string | null;
  state: string;
  expansionJobId: string | null;
  updatedAt: string;
}

export interface DiscoveryJobRecord {
  id: string;
  cellId: string;
  state: string;
  collectorId: string | null;
  collectionRunId: string | null;
  facilitiesDiscovered: number;
  searchContext: string;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
}

