"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Notification } from "@/components/admin/notifications/NotificationsPopover";
import { toast } from "@/hooks/use-toast";
import { 
  fetchNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  deleteNotification,
  setupNotificationPolling
} from "@/lib/notification-service";

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "isRead">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  loading: boolean;
  refreshNotifications: () => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  // Track new notifications for toast display
  const [newNotifications, setNewNotifications] = useState<Notification[]>([]);
  
  // Load notifications from API on mount
  useEffect(() => {
    // Initial load of notifications
    loadNotifications();
    
    // Set up polling for real-time updates - only for new unread notifications
    const cleanup = setupNotificationPolling((polledNotifications) => {
      console.log(`Received ${polledNotifications.length} notifications from polling`);
      
      // Only update if there are new notifications
      if (polledNotifications.length > 0) {
        setNotifications(prev => {
          // Merge new notifications with existing ones, avoiding duplicates
          const existingIds = new Set(prev.map(n => n.id));
          const newItems = polledNotifications.filter(n => !existingIds.has(n.id));
          
          // Only update if we actually have new items
          if (newItems.length === 0) {
            console.log('No new notifications to add');
            return prev;
          }
          
          console.log(`Adding ${newItems.length} new notifications`);
          
          // Store new notifications for toast display in a separate effect
          if (newItems.length > 0) {
            setNewNotifications(newItems);
          }
          
          return [...newItems, ...prev];
        });
      }
    });
    
    return cleanup;
  }, []);
  
  // Show toast notifications for new items
  useEffect(() => {
    if (newNotifications.length > 0) {
      // Show toast for each new notification
      newNotifications.forEach(notification => {
        toast({
          title: notification.title,
          description: notification.message,
          variant: "default",
        });
      });
      
      // Clear the new notifications array
      setNewNotifications([]);
    }
  }, [newNotifications]);
  
  // Load notifications from API
  const loadNotifications = async () => {
    try {
      // Set loading state
      setLoading(true);
      console.log('Loading notifications...');
      
      // Fetch notifications from API
      const data = await fetchNotifications(false, 50);
      console.log(`Loaded ${data.length} notifications from API`);
      
      // Update state with fetched notifications
      setNotifications(data);
      
      // Save to local storage as backup
      try {
        localStorage.setItem('admin-notifications', JSON.stringify(data));
      } catch (storageError) {
        console.error('Failed to save notifications to local storage:', storageError);
      }
    } catch (error) {
      console.error("Failed to load notifications:", error);
      
      // Fallback to local storage if API fails
      try {
        const savedNotifications = localStorage.getItem('admin-notifications');
        if (savedNotifications) {
          const parsedNotifications = JSON.parse(savedNotifications);
          console.log(`Loaded ${parsedNotifications.length} notifications from local storage`);
          setNotifications(parsedNotifications);
        } else {
          console.log('No saved notifications found in local storage');
          setNotifications([]);
        }
      } catch (storageError) {
        console.error('Failed to load notifications from local storage:', storageError);
        setNotifications([]);
      }
    } finally {
      // Always set loading to false when done
      console.log('Finished loading notifications');
      setLoading(false);
    }
  };
  
  // Track last refresh time to prevent excessive refreshing
  const [lastRefreshTime, setLastRefreshTime] = useState(0);
  
  // Refresh notifications with throttling
  const refreshNotifications = async () => {
    const now = Date.now();
    const minInterval = 2000; // Minimum 2 seconds between refreshes
    
    // Check if we've refreshed too recently
    if (now - lastRefreshTime < minInterval) {
      console.log('Refresh requested too soon, skipping');
      return;
    }
    
    // Update last refresh time
    setLastRefreshTime(now);
    console.log('Refreshing notifications...');
    
    // Load notifications
    await loadNotifications();
  };
  
  // Add a new notification (client-side only, for testing)
  const addNotification = (notification: Omit<Notification, "id" | "createdAt" | "isRead">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for new notification
    toast({
      title: notification.title,
      description: notification.message,
      variant: "default",
    });
  };
  
  // Mark a notification as read
  const markAsRead = async (id: string) => {
    try {
      // Optimistically update UI
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, isRead: true } 
            : notification
        )
      );
      
      // Call API to persist change
      await markNotificationAsRead(id);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      // Revert optimistic update on error
      await refreshNotifications();
      
      toast({
        title: "Алдаа",
        description: "Мэдэгдлийг уншсан гэж тэмдэглэхэд алдаа гарлаа",
        variant: "destructive",
      });
    }
  };
  
  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      // Optimistically update UI
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, isRead: true }))
      );
      
      // Call API to persist change
      await markAllNotificationsAsRead();
      
      toast({
        title: "Амжилттай",
        description: "Бүх мэдэгдлийг уншсан гэж тэмдэглэлээ",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
      // Revert optimistic update on error
      await refreshNotifications();
      
      toast({
        title: "Алдаа",
        description: "Бүх мэдэгдлийг уншсан гэж тэмдэглэхэд алдаа гарлаа",
        variant: "destructive",
      });
    }
  };
  
  // Remove a notification
  const removeNotification = async (id: string) => {
    try {
      // Optimistically update UI
      setNotifications(prev => 
        prev.filter(notification => notification.id !== id)
      );
      
      // Call API to persist change
      await deleteNotification(id);
    } catch (error) {
      console.error("Failed to delete notification:", error);
      // Revert optimistic update on error
      await refreshNotifications();
      
      toast({
        title: "Алдаа",
        description: "Мэдэгдлийг устгахад алдаа гарлаа",
        variant: "destructive",
      });
    }
  };
  
  return (
    <NotificationsContext.Provider 
      value={{ 
        notifications, 
        unreadCount, 
        addNotification, 
        markAsRead, 
        markAllAsRead, 
        removeNotification,
        loading,
        refreshNotifications
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
}