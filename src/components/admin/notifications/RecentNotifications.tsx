"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Calendar, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { useNotifications } from "@/context/NotificationsContext";
import { NotificationType } from "./NotificationsPopover";
import Link from "next/link";

export default function RecentNotifications() {
  const { notifications, markAsRead } = useNotifications();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Get only the 5 most recent notifications
  const recentNotifications = notifications.slice(0, 5);
  
  // Get icon based on notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "BOOKING":
        return <Calendar className="w-4 h-4 text-green-500" />;
      case "SYSTEM":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
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
    } else {
      return format(date, "yyyy-MM-dd");
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Сүүлийн мэдэгдлүүд</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-3 animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : recentNotifications.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            Мэдэгдэл байхгүй байна
          </div>
        ) : (
          <div className="space-y-4">
            {recentNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex items-start space-x-3 ${!notification.isRead ? 'bg-blue-50 -mx-3 p-3 rounded-md' : ''}`}
              >
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatRelativeTime(notification.createdAt)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5 line-clamp-1">
                    {notification.message}
                  </p>
                </div>
              </div>
            ))}
            
            <div className="pt-2">
              <Link href="/admin/notifications">
                <Button variant="ghost" size="sm" className="w-full">
                  Бүх мэдэгдлүүдийг харах
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}