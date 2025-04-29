"use client";

import { useState, useEffect } from "react";
import { 
  ShoppingCart, 
  Calendar, 
  Clock, 
  Check, 
  Trash2, 
  Filter 
} from "lucide-react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useNotifications } from "@/context/NotificationsContext";
import { Notification, NotificationType } from "@/components/admin/notifications/NotificationsPopover";
import AddTestNotification from "@/components/admin/notifications/AddTestNotification";

export default function NotificationsPage() {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    removeNotification 
  } = useNotifications();
  
  const [filter, setFilter] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter notifications based on selected filter
  const filteredNotifications = notifications.filter(notification => {
    if (filter === "ALL") return true;
    if (filter === "UNREAD") return !notification.isRead;
    return notification.type === filter;
  });
  
  // Handle notification action
  const handleAction = async (notification: Notification) => {
    try {
      // Mark as read first
      markAsRead(notification.id);
      
      // Handle different notification types
      if (notification.type === "ORDER" && notification.data?.orderId) {
        // Navigate to order details
        window.location.href = `/admin/orders?highlight=${notification.data.orderId}`;
      } else if (notification.type === "BOOKING" && notification.data?.bookingId) {
        // Navigate to booking details
        window.location.href = `/admin/bookings?highlight=${notification.data.bookingId}`;
      }
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
        return <ShoppingCart className="w-5 h-5 text-blue-500" />;
      case "BOOKING":
        return <Calendar className="w-5 h-5 text-green-500" />;
      case "SYSTEM":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };
  
  // Format relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return "Хэдэн секундын өмнө";
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} минутын өмнө`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} цагийн өмнө`;
    } else if (diffInSeconds < 604800) {
      return `${Math.floor(diffInSeconds / 86400)} өдрийн өмнө`;
    } else {
      return format(date, "yyyy-MM-dd");
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Мэдэгдлүүд</h1>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Бүх мэдэгдлүүд" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Бүх мэдэгдлүүд</SelectItem>
                <SelectItem value="UNREAD">Уншаагүй</SelectItem>
                <SelectItem value="ORDER">Захиалга</SelectItem>
                <SelectItem value="BOOKING">Цаг захиалга</SelectItem>
                <SelectItem value="SYSTEM">Систем</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <AddTestNotification />
          
          <Button 
            variant="outline" 
            onClick={markAllAsRead}
            disabled={!notifications.some(n => !n.isRead)}
          >
            <Check className="w-4 h-4 mr-2" />
            Бүгдийг уншсан болгох
          </Button>
        </div>
      </div>
      
      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">
            Мэдэгдлүүдийг ачааллаж байна...
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Мэдэгдэл байхгүй байна
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <li 
                key={notification.id} 
                className={`p-6 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatRelativeTime(notification.createdAt)}
                      </p>
                    </div>
                    <p className="text-base text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <div className="mt-3 flex items-center space-x-4">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleAction(notification)}
                      >
                        Харах
                      </Button>
                      
                      {!notification.isRead && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Уншсан болгох
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeNotification(notification.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Устгах
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}