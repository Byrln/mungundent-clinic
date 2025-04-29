"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useAuth } from "@/context/AuthContext";
import { NotificationsProvider } from "@/context/NotificationsContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  // Skip authentication check for login page
  const isLoginPage = pathname === "/admin/login";
  
  useEffect(() => {
    if (!loading && !isAuthenticated && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, loading, router, isLoginPage]);
  
  // Show loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // If not authenticated and not on login page, don't render anything
  // (useEffect will redirect to login)
  if (!isAuthenticated && !isLoginPage) {
    return null;
  }
  
  // If on login page, just render the children (login form)
  if (isLoginPage) {
    return <>{children}</>;
  }
  
  // Render admin layout for authenticated users
  return (
    <NotificationsProvider>
      <div className="flex min-h-screen bg-gray-100" suppressHydrationWarning>
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </NotificationsProvider>
  );
}