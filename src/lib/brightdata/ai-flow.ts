import { bdFetch } from './client';
import { AIFlowCreateResponse, BrightDataProgressResponse } from './types';

// 1. Create the empty scraper entity
export async function createScraperTemplate(): Promise<string> {
  const response = await bdFetch<AIFlowCreateResponse>('/collector', {
    method: 'POST',
  });
  return response.id;
}

// 2. Trigger the AI Agent to write the scraper code
export async function triggerAIGeneration(collectorId: string, url: string, prompt: string): Promise<void> {
  await bdFetch(`/collectors/${collectorId}/automate_template`, {
    method: 'POST',
    body: JSON.stringify({ url, prompt }),
  });
}

// 3. Poll for AI job progress
export async function pollAIGenerationProgress(collectorId: string): Promise<BrightDataProgressResponse> {
  return await bdFetch<BrightDataProgressResponse>(
    `/collectors/${collectorId}/automate_template/progress`
  );
}
