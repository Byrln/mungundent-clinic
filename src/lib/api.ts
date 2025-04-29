/**
 * API helper functions for making requests to the backend
 */

/**
 * Fetch data from the API with enhanced error handling
 * @param url The API endpoint URL
 * @param options Fetch options
 * @returns The response data
 */
export async function fetchAPI<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    console.log(`Making API request to: ${url}`, { method: options?.method || 'GET' });
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    // Get the response data
    const responseData = await response.json().catch(() => ({}));
    
    if (!response.ok) {
      console.error(`API error response:`, { 
        status: response.status, 
        statusText: response.statusText,
        data: responseData 
      });
      
      // Throw a more detailed error
      throw new Error(
        responseData.error || 
        `API error: ${response.status} ${response.statusText}`
      );
    }

    return responseData;
  } catch (error: any) {
    // Log the error with more details
    console.error(`Error fetching ${url}:`, {
      message: error.message,
      stack: error.stack,
    });
    
    // Rethrow the error to be handled by the caller
    throw error;
  }
}

/**
 * Fetch data from the API with authentication
 * @param url The API endpoint URL
 * @param options Fetch options
 * @returns The response data
 */
export async function fetchAuthAPI<T>(url: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin-token') : null;
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  return fetchAPI<T>(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...(options?.headers || {}),
    },
  });
}

/**
 * Bookings API
 */
export const BookingsAPI = {
  getAll: () => fetchAuthAPI<any[]>('/api/bookings'),
  getById: (id: string) => fetchAuthAPI<any>(`/api/bookings/${id}`),
  create: (data: any) => fetchAPI<any>('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => fetchAuthAPI<any>(`/api/bookings/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchAuthAPI<any>(`/api/bookings/${id}`, {
    method: 'DELETE',
  }),
};

/**
 * Settings API
 */
export const SettingsAPI = {
  get: () => fetchAPI<any>('/api/settings'),
  update: (data: any) => fetchAuthAPI<any>('/api/settings', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};