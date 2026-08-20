import { bdFetch } from './client';
import { BrightDataTriggerResponse } from './types';

export async function triggerCollection(
  collectorId: string,
  inputs: Record<string, any>[]
): Promise<string> {
  const response = await bdFetch<BrightDataTriggerResponse>(
    `/trigger?collector=${collectorId}&queue_next=1`,
    {
      method: 'POST',
      body: JSON.stringify(inputs),
    }
  );
  return response.collection_id;
}

export async function getDataset<T>(snapshotId: string): Promise<T[] | { status: string }> {
  try {
    const data = await bdFetch<T[] | { status: string }>(`/dataset?id=${snapshotId}`);
    return data;
  } catch (err) {
    console.error('Error fetching dataset', err);
    throw err;
  }
}
