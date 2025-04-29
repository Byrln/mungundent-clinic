"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, DollarSign, ShoppingBag, Package } from "lucide-react";

interface StatsData {
  totalBookings: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<StatsData>({
    totalBookings: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch bookings count
        const bookingsResponse = await fetch('/api/bookings');
        if (!bookingsResponse.ok) throw new Error('Failed to fetch bookings');
        const bookingsData = await bookingsResponse.json();
        
        // Fetch orders
        const ordersResponse = await fetch('/api/orders');
        if (!ordersResponse.ok) throw new Error('Failed to fetch orders');
        const ordersData = await ordersResponse.json();
        
        // Fetch products
        const productsResponse = await fetch('/api/products');
        if (!productsResponse.ok) throw new Error('Failed to fetch products');
        const productsData = await productsResponse.json();
        
        // Calculate total revenue from orders
        const totalRevenue = ordersData.reduce((sum: number, order: any) => 
          sum + order.totalAmount, 0);
        
        setStats({
          totalBookings: bookingsData.length,
          totalOrders: ordersData.length,
          totalRevenue: totalRevenue,
          totalProducts: productsData.length,
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setError("Failed to load dashboard data. Please try again.");
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Нийт захиалга",
      value: stats.totalBookings,
      icon: Calendar,
      color: "bg-blue-500",
    },
    {
      title: "Нийт худалдаа",
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: "bg-green-500",
    },
    {
      title: "Нийт орлого",
      value: `₮${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-purple-500",
    },
    {
      title: "Нийт бүтээгдэхүүн",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-orange-500",
    },
  ];

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${stat.color} text-white mr-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              {loading ? (
                <div className="h-6 w-20 bg-gray-200 animate-pulse rounded mt-1"></div>
              ) : (
                <p className="text-2xl font-semibold">{stat.value}</p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}