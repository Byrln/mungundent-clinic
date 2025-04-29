"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ChevronRight, AlertCircle } from "lucide-react";

interface Booking {
  id: string;
  name: string;
  serviceType: string;
  date: string;
  time: string;
  phone: string;
}

export default function RecentBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        
        // Fetch bookings from the API
        const response = await fetch('/api/bookings');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch bookings: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Sort by date (newest first) and take only the most recent 5
        const sortedBookings = data
          .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);
        
        setBookings(sortedBookings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings. Please try again.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

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
      ) : bookings.length === 0 ? (
        <div className="py-6 text-center text-gray-500">
          <p>Одоогоор захиалга байхгүй байна.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {bookings.map((booking) => (
            <div key={booking.id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{booking.name}</p>
                <p className="text-sm text-gray-500">{booking.serviceType}</p>
                <p className="text-xs text-gray-400">
                  {format(new Date(booking.date), "MMM d, yyyy")} at {booking.time}
                </p>
              </div>
              <Link 
                href={`/admin/bookings/${booking.id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 text-center">
        <Link 
          href="/admin/bookings"
          className="text-sm text-blue-500 hover:text-blue-700 font-medium"
        >
          Бүх захиалгыг харах
        </Link>
      </div>
    </div>
  );
}