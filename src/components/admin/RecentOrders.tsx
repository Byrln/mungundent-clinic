"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ChevronRight, AlertCircle } from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        
        // Fetch orders from the API
        const response = await fetch('/api/orders');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Sort by createdAt (newest first) and take only the most recent 5
        const sortedOrders = data
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
        
        setOrders(sortedOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders. Please try again.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800";
      case "SHIPPED":
        return "bg-purple-100 text-purple-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (error) {
    return (
      <div className="flex items-center p-4 text-red-700 bg-red-50 rounded-md">
        <AlertCircle className="w-5 h-5 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse flex items-center p-3 border-b border-gray-100">
              <div className="w-full">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="py-6 text-center text-gray-500">
          <p>Одоогоор худалдаа байхгүй байна.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {orders.map((order) => (
            <div key={order.id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{order.customerName}</p>
                <p className="text-sm text-gray-500">₮{order.totalAmount.toLocaleString()}</p>
                <p className="text-xs text-gray-400">
                  {format(new Date(order.createdAt), "MMM d, yyyy")}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <Link 
                  href={`/admin/orders/${order.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 text-center">
        <Link 
          href="/admin/orders"
          className="text-sm text-blue-500 hover:text-blue-700 font-medium"
        >
          Бүх худалдааг харах
        </Link>
      </div>
    </div>
  );
}