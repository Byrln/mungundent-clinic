"use client";

import { useState, useEffect } from "react";
import { Bell, X, Check, Clock, ShoppingCart, Calendar } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { NotificationBadge } from "@/components/ui/notification-badge";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

// Define notification types
export type NotificationType = "ORDER" | "BOOKING" | "SYSTEM";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  data?: {
    orderId?: string;
    bookingId?: string;
    [key: string]: any;
  };
}

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, you would fetch from an API
        // For demo, we'll use mock data
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
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNotifications();
  }, []);
  
  // Mark notification as read
  const markAsRead = async (id: string) => {
    try {
      // In a real app, you would call an API
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, isRead: true } 
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      toast({
        title: "Алдаа",
        description: "Мэдэгдлийг уншсан гэж тэмдэглэхэд алдаа гарлаа",
        variant: "destructive",
      });
    }
  };
  
  // Mark all as read
  const markAllAsRead = async () => {
    try {
      // In a real app, you would call an API
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, isRead: true }))
      );
      
      toast({
        title: "Амжилттай",
        description: "Бүх мэдэгдлийг уншсан гэж тэмдэглэлээ",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
      toast({
        title: "Алдаа",
        description: "Бүх мэдэгдлийг уншсан гэж тэмдэглэхэд алдаа гарлаа",
        variant: "destructive",
      });
    }
  };
  
  // Handle notification action
  const handleAction = async (notification: Notification) => {
    try {
      // Mark as read first
      await markAsRead(notification.id);
      
      // Handle different notification types
      if (notification.type === "ORDER" && notification.data?.orderId) {
        // Navigate to order details
        window.location.href = `/admin/orders?highlight=${notification.data.orderId}`;
      } else if (notification.type === "BOOKING" && notification.data?.bookingId) {
        // Navigate to booking details
        window.location.href = `/admin/bookings?highlight=${notification.data.bookingId}`;
      }
      
      // Close popover
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to handle notification action:", error);
      toast({
        title: "Алдаа",
        description: "Мэдэгдлийн үйлдлийг гүйцэтгэхэд алдаа гарлаа",
        variant: "destructive",
      });
    }
  };
  
  // Get icon based on notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "ORDER":
        return <ShoppingCart className="w-4 h-4 text-blue-500" />;
      case "BOOKING":
        return <Calendar className="w-4 h-4 text-green-500" />;
      case "SYSTEM":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none">
          <Bell className="w-5 h-5" />
          <NotificationBadge 
            count={unreadCount} 
            className="absolute top-0 right-0" 
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-medium">Мэдэгдлүүд</h3>
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Бүгдийг уншсан болгох
            </button>
          )}
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              Мэдэгдлүүдийг ачааллаж байна...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Мэдэгдэл байхгүй байна
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <li 
                  key={notification.id} 
                  className={`p-4 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(notification.createdAt), "HH:mm")}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                        <button
                          onClick={() => handleAction(notification)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Харах
                        </button>
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-gray-600 hover:text-gray-800 flex items-center"
                          >
                            <Check className="w-3 h-3 mr-1" />
                            Уншсан
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="p-2 border-t border-gray-200">
          <button 
            onClick={() => window.location.href = '/admin/notifications'}
            className="w-full py-2 px-4 text-sm text-center text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md"
          >
            Бүх мэдэгдлүүдийг харах
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}