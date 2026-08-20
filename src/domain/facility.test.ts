import { describe, it, expect } from 'vitest';
import { evaluateScraperHealth } from './facility';

describe('Facility Domain Logic', () => {
  describe('evaluateScraperHealth', () => {
    it('returns 0 health and healthy=false when results are empty', () => {
      const result = evaluateScraperHealth([], ['facility_name']);
      expect(result.healthy).toBe(false);
      expect(result.overallHealth).toBe(0);
      expect(result.brokenFields).toEqual(['facility_name']);
    });

    it('calculates health correctly for a healthy payload', () => {
      const payload = [
        { facility_name: 'A', address: '123' },
        { facility_name: 'B', address: '456' },
      ];

      const result = evaluateScraperHealth(payload, ['facility_name', 'address']);
      expect(result.healthy).toBe(true);
      expect(result.overallHealth).toBe(1);
      expect(result.brokenFields).toHaveLength(0);
    });

    it('detects a broken field when it is missing in >50% of records', () => {
      const payload = [
        { facility_name: 'A', address: '123' },
        { facility_name: 'B' }, // Missing address
        { facility_name: 'C' }, // Missing address
      ];

      const result = evaluateScraperHealth(payload, ['facility_name', 'address']);

      // Address completeness is 1/3 (0.33)
      // Facility name is 3/3 (1.0)
      // Overall = (1.33 / 2) = 0.66
      expect(result.healthy).toBe(false);
      expect(result.overallHealth).toBeCloseTo(0.66, 1);
      expect(result.brokenFields).toEqual(['address']);
    });
  });
});
