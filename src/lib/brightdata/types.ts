export interface BrightDataTriggerResponse {
  collection_id: string; // The snapshot ID (j_xxx)
}

export interface BrightDataProgressResponse {
  status: 'running' | 'pending_answer' | 'completed' | 'failed';
  diff?: any; // The diff proposed by AI
}

export interface BrightDataResumeResponse {
  status: 'resumed';
}

export interface ScraperError {
  code: string;
  message: string;
}

export interface AIFlowCreateResponse {
  id: string; // The collector ID (c_xxx)
}
