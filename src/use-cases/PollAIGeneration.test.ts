import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PollAIGeneration } from './PollAIGeneration';
import { BrightDataAdapter } from '../infrastructure/brightdata/adapter';
import { ScraperRepository } from '../infrastructure/db/repositories/scrapers';
import { NotFoundError } from '../domain/errors';

vi.mock('../infrastructure/brightdata/adapter');
vi.mock('../infrastructure/db/repositories/scrapers');

describe('PollAIGeneration Use Case', () => {
  const mockCollectorId = 'c_123';
  const mockDbId = 'uuid-123';

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('throws NotFoundError if scraper is not in DB', async () => {
    vi.mocked(ScraperRepository.findById).mockReturnValue(null);

    await expect(PollAIGeneration.execute(mockCollectorId)).rejects.toThrow(NotFoundError);
  });

  it('updates the database when status changes to ready', async () => {
    vi.mocked(ScraperRepository.findById).mockReturnValue({
      id: mockDbId,
      collectorId: mockCollectorId,
      name: 'Test',
      targetUrl: 'http://test.com',
      description: 'Test',
      status: 'queued',
      generationStatus: 'creating',
      schemaVersion: '1.0',
      webhookSecret: null,
      requiredFields: '[]',
      lastHealthy: 1,
      createdAt: '2026-01-01',
    });

    vi.mocked(BrightDataAdapter.pollAIProgress).mockResolvedValue({
      status: 'completed',
    });

    const result = await PollAIGeneration.execute(mockCollectorId);

    expect(result.generationStatus).toBe('ready');
    expect(result.isFinished).toBe(true);
    expect(ScraperRepository.updateGenerationStatus).toHaveBeenCalledWith(mockCollectorId, 'ready');
    expect(ScraperRepository.updateStatus).toHaveBeenCalledWith(mockCollectorId, 'ready');
  });
});
