export const BRIGHTDATA_API_BASE = 'https://api.brightdata.com/dca';

function getHeaders() {
  const token = process.env.BRIGHTDATA_API_KEY;
  if (!token) {
    throw new Error('BRIGHTDATA_API_KEY is not set');
  }
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

export async function bdFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BRIGHTDATA_API_BASE}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Bright Data API Error (${response.status}):`, errorText);
      throw new Error(`Bright Data API Error: ${response.status} ${errorText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json() as Promise<T>;
    }
    
    return response.text() as unknown as Promise<T>;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
