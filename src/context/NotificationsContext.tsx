"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Notification, NotificationType } from "@/components/admin/notifications/NotificationsPopover";
import { toast } from "@/hooks/use-toast";

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "isRead">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  loading: boolean;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  // Load notifications from localStorage on mount
  useEffect(() => {
    const loadNotifications = () => {
      try {
        const savedNotifications = localStorage.getItem('admin-notifications');
        if (savedNotifications) {
          setNotifications(JSON.parse(savedNotifications));
        } else {
          // Initialize with mock data for demo
          const mockNotifications: Notification[] = [
            {
              id: "1",
              type: "ORDER",
              title: "Шинэ захиалга",
              message: "Шинэ захиалга ирлээ: #ORD-2023-001",
              isRead: false,
              createdAt: new Date().toISOString(),
              data: {
                orderId: "ORD-2023-001"
              }
            },
            {
              id: "2",
              type: "BOOKING",
              title: "Шинэ цаг захиалга",
              message: "Шинэ цаг захиалга ирлээ: #BKG-2023-001",
              isRead: false,
              createdAt: new Date(Date.now() - 3600000).toISOString(),
              data: {
                bookingId: "BKG-2023-001"
              }
            },
            {
              id: "3",
              type: "SYSTEM",
              title: "Системийн мэдэгдэл",
              message: "Системийн шинэчлэлт хийгдлээ",
              isRead: true,
              createdAt: new Date(Date.now() - 86400000).toISOString()
            }
          ];
          setNotifications(mockNotifications);
          localStorage.setItem('admin-notifications', JSON.stringify(mockNotifications));
        }
      } catch (error) {
        console.error("Failed to load notifications:", error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadNotifications();
    
    // In a real app, you would set up a WebSocket or polling mechanism here
    // to receive real-time notifications
  }, []);
  
  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('admin-notifications', JSON.stringify(notifications));
    }
  }, [notifications, loading]);
  
  // Add a new notification
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
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };
  
  // Remove a notification
  const removeNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
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
        loading
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