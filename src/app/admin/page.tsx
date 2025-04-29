import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import DashboardStats from "@/components/admin/DashboardStats";
import RecentBookings from "@/components/admin/RecentBookings";
import RecentNotifications from "@/components/admin/notifications/RecentNotifications";

export const metadata: Metadata = {
  title: "Admin Dashboard | Dental Clinic",
  description: "Admin dashboard for managing the dental clinic website",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Хянах самбар</h1>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Сүүлийн захиалгууд</h2>
          <RecentBookings />
        </Card>
      </div>
    </div>
  );
}