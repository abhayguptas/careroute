import { bdFetch } from './client';
import { BrightDataProgressResponse, BrightDataResumeResponse } from './types';

export async function triggerHealing(collectorId: string, prompt: string, url: string): Promise<void> {
  await bdFetch(`/collectors/${collectorId}/refactor_template`, {
    method: 'POST',
    body: JSON.stringify({ prompt, url }),
  });
}

export async function pollHealingProgress(collectorId: string): Promise<BrightDataProgressResponse> {
  return await bdFetch<BrightDataProgressResponse>(
    `/collectors/${collectorId}/refactor_template/progress`
  );
}

export async function approveHealing(collectorId: string): Promise<BrightDataResumeResponse> {
  return await bdFetch<BrightDataResumeResponse>(
    `/collectors/${collectorId}/resume_automation_job`,
    {
      method: 'POST',
      body: JSON.stringify({ answer: 'approve' }),
    }
  );
}
