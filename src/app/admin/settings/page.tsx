import { Metadata } from "next";
import SettingsForm from "@/components/admin/settings/SettingsForm";

export const metadata: Metadata = {
  title: "Settings | Admin Dashboard",
  description: "Admin settings for the dental clinic website",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Тохиргоо</h1>
      
      <SettingsForm />
    </div>
  );
}