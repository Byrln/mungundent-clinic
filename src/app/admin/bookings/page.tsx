import { Metadata } from "next";
import BookingsTable from "@/components/admin/bookings/BookingsTable";

export const metadata: Metadata = {
  title: "Manage Bookings | Admin Dashboard",
  description: "Manage bookings for the dental clinic",
};

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Захиалгууд</h1>
      </div>
      
      <BookingsTable />
    </div>
  );
}