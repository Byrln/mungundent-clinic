/**
 * Helper functions for API requests
 */

/**
 * Get the authorization header for authenticated API requests
 */
export function getAuthHeader(): HeadersInit {
  // In a browser environment
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin-token');
    if (token) {
      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    }
  }
  
  // Default headers for unauthenticated requests
  return {
    'Content-Type': 'application/json',
  };
}

/**
 * Make an authenticated API request
 */
export async function fetchWithAuth(
  url: string, 
  options: RequestInit = {}
): Promise<Response> {
  const headers = getAuthHeader();
  
  return fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });
}

/**
 * Handle API response and parse JSON
 */
export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'An error occurred with the API request');
  }
  
  return response.json() as Promise<T>;
}