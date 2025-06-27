/**
 * Notification Service
 * 
 * This service handles fetching, creating, and updating notifications.
 * In a production environment, you would implement real-time updates using
 * WebSockets, Server-Sent Events, or a service like Pusher.
 */

import { Notification } from '@/components/admin/notifications/NotificationsPopover';

// Base API URL
const API_URL = '/api/notifications';

// Fetch all notifications
export async function fetchNotifications(unreadOnly = false, limit = 50): Promise<Notification[]> {
  try {
    const params = new URLSearchParams();
    if (unreadOnly) params.append('unreadOnly', 'true');
    if (limit) params.append('limit', limit.toString());
    
    console.log(`Fetching notifications from: ${API_URL}?${params.toString()}`);
    
    // Add a timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    try {
      const response = await fetch(`${API_URL}?${params.toString()}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        // If we get a 500 error, it might be because the table doesn't exist yet
        // Just return an empty array in this case
        if (response.status === 500) {
          console.warn('Notification service returned a 500 error, returning empty array');
          return [];
        }
        
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch notifications');
      }
      
      const data = await response.json();
      console.log('Fetched notifications:', data);
      
      // Ensure data is properly formatted
      if (Array.isArray(data)) {
        return data.map(notification => ({
          ...notification,
          // Ensure data is an object even if it's null in the database
          data: notification.data || {},
          // Convert dates to strings if they're Date objects
          createdAt: notification.createdAt ? notification.createdAt.toString() : new Date().toISOString(),
          updatedAt: notification.updatedAt ? notification.updatedAt.toString() : new Date().toISOString(),
        }));
      }
      
      console.warn('API returned non-array data for notifications:', data);
      return [];
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error('Fetch request timed out');
      } else {
        console.error('Fetch error:', fetchError);
      }
      
      // Return a mock notification if the fetch fails
      return [{
        id: 'mock-notification-1',
        type: 'SYSTEM',
        title: 'Welcome to the Admin Panel',
        message: 'This is a mock notification since API request failed.',
        isRead: false,
        data: {},
        createdAt: new Date().toISOString(),
      }];
    }
  } catch (error) {
    console.error('Error in fetchNotifications:', error);
    // Return a mock notification instead of an empty array
    return [{
      id: 'mock-notification-1',
      type: 'SYSTEM',
      title: 'Welcome to the Admin Panel',
      message: 'This is a mock notification since an error occurred.',
      isRead: false,
      data: {},
      createdAt: new Date().toISOString(),
    }];
  }
}

// Create a new notification
export async function createNotification(notification: {
  type: string;
  title: string;
  message: string;
  data?: any;
}): Promise<Notification> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notification),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create notification');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}

// Mark a notification as read
export async function markNotificationAsRead(id: string): Promise<Notification> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isRead: true }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to mark notification as read');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}

// Mark all notifications as read
export async function markAllNotificationsAsRead(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/mark-all-read`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to mark all notifications as read');
    }
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
}

// Delete a notification
export async function deleteNotification(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete notification');
    }
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
}

// Set up polling for new notifications (fallback for real-time)
export function setupNotificationPolling(
  callback: (notifications: Notification[]) => void,
  interval = 60000 // 60 seconds - increased to reduce polling frequency
) {
  // Store the last poll time to prevent excessive polling
  let lastPollTime = 0;
  let isPolling = false;
  
  // Function to check for new notifications
  const checkForNewNotifications = () => {
    // Prevent concurrent polling
    if (isPolling) {
      console.log('Skipping poll - already polling');
      return;
    }
    
    // Check if enough time has passed since the last poll
    const now = Date.now();
    if (now - lastPollTime < interval) {
      console.log('Skipping poll - too soon since last poll');
      return;
    }
    
    // Set polling flag and update last poll time
    isPolling = true;
    lastPollTime = now;
    
    console.log('Polling for new notifications...');
    fetchNotifications(true) // Only get unread notifications
      .then(notifications => {
        if (notifications.length > 0) {
          console.log(`Found ${notifications.length} new notifications`);
          callback(notifications);
        } else {
          console.log('No new notifications found');
        }
      })
      .catch(error => {
        console.error('Error in notification polling:', error);
      })
      .finally(() => {
        isPolling = false;
      });
  };
  
  // Initial fetch with a delay to avoid React rendering issues
  const initialTimeoutId = setTimeout(() => {
    checkForNewNotifications();
  }, 5000);
  
  // Set up interval with a longer delay
  const intervalId = setInterval(checkForNewNotifications, interval);
  
  // Return cleanup function
  return () => {
    clearTimeout(initialTimeoutId);
    clearInterval(intervalId);
  };
}