import { Metadata } from "next";
import OrdersTable from "@/components/admin/orders/OrdersTable";

export const metadata: Metadata = {
  title: "Manage Orders | Admin Dashboard",
  description: "Manage orders for the dental clinic",
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Худалдаа</h1>
      </div>
      
      <OrdersTable />
    </div>
  );
}