"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Clock, Users, TrendingUp, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface BookingAnalyticsData {
  averageWaitTime: number; // in minutes
  todayBookings: number;
  weeklyGrowthPercentage: number;
  monthlyBookings: number;
  popularServices: { name: string; count: number }[];
  bookingTrends: { day: string; count: number }[];
  peakHours: { hour: string; count: number }[];
}

export default function BookingAnalytics() {
  const [analytics, setAnalytics] = useState<BookingAnalyticsData>({
    averageWaitTime: 0,
    todayBookings: 0,
    weeklyGrowthPercentage: 0,
    monthlyBookings: 0,
    popularServices: [],
    bookingTrends: [],
    peakHours: []
  });
  const [loading, setLoading] = useState(true);

  // Track retry attempts
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`Fetching analytics data (attempt ${retryCount + 1})...`);
        
        // Fetch real data from API
        const response = await fetch('/api/analytics/bookings');
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API error response:', errorData);
          throw new Error(`API error: ${response.status} - ${errorData.error || 'Unknown error'}`);
        }
        
        const data = await response.json();
        console.log('Analytics data received:', data);
        
        // Validate the data structure
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid data format received from API');
        }
        
        setAnalytics({
          averageWaitTime: data.averageWaitTime || 0,
          todayBookings: data.todayBookings || 0,
          weeklyGrowthPercentage: data.weeklyGrowthPercentage || 0,
          monthlyBookings: data.monthlyBookings || 0,
          popularServices: Array.isArray(data.popularServices) ? data.popularServices : [],
          bookingTrends: Array.isArray(data.bookingTrends) ? data.bookingTrends : [],
          peakHours: Array.isArray(data.peakHours) ? data.peakHours : [],
        });
        
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching booking analytics:", error);
        setError(error.message || 'Unknown error');
        
        toast({
          title: "Алдаа",
          description: "Аналитик мэдээлэл авахад алдаа гарлаа. Дахин оролдоно уу.",
          variant: "destructive",
        });
        
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [retryCount]);
  
  // Function to retry loading data
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Захиалгын аналитик</h2>
        {error && (
          <button 
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Дахин оролдох
          </button>
        )}
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p className="font-medium">Мэдээлэл ачааллахад алдаа гарлаа</p>
          <p className="text-sm mt-1">Дахин оролдоно уу. Алдаа: {error}</p>
        </div>
      )}
      
      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Дундаж хүлээлгийн хугацаа</p>
              {loading ? (
                <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                <p className="text-lg font-semibold">{analytics.averageWaitTime} мин</p>
              )}
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Өнөөдрийн захиалга</p>
              {loading ? (
                <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                <p className="text-lg font-semibold">{analytics.todayBookings}</p>
              )}
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">7 хоногийн өсөлт</p>
              {loading ? (
                <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                <p className="text-lg font-semibold">{analytics.weeklyGrowthPercentage > 0 ? '+' : ''}{analytics.weeklyGrowthPercentage.toFixed(1)}%</p>
              )}
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-amber-100 text-amber-600 mr-3">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Сарын захиалга</p>
              {loading ? (
                <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                <p className="text-lg font-semibold">{analytics.monthlyBookings}</p>
              )}
            </div>
          </div>
        </Card>
      </div>
      
      {/* Popular services and booking trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Түгээмэл үйлчилгээнүүд</h3>
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-16"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {analytics.popularServices.map((service, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700">{service.name}</span>
                  <span className="text-gray-500 font-medium">{service.count} захиалга</span>
                </div>
              ))}
            </div>
          )}
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Өдрөөр захиалга</h3>
          {loading ? (
            <div className="h-48 bg-gray-100 animate-pulse rounded"></div>
          ) : (
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.bookingTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 border rounded shadow-lg">
                            <p className="text-sm">{`${payload[0].value} захиалга`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>
      
      {/* Peak hours */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Оргил цагууд</h3>
        {loading ? (
          <div className="h-48 bg-gray-100 animate-pulse rounded"></div>
        ) : (
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.peakHours}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border rounded shadow-lg">
                          <p className="text-sm">{`${payload[0].value} захиалга`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{
                    fill: "#fff",
                    stroke: "#10B981",
                    strokeWidth: 2,
                    r: 4
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#10B981",
                    stroke: "#fff"
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </div>
  );
}