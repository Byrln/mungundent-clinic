"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  ShoppingBag,
  FileText,
  Settings,
  Package,
  Users,
  Bell,
} from "lucide-react";
import { useNotifications } from "@/context/NotificationsContext";
import { NotificationBadge } from "@/components/ui/notification-badge";

const sidebarLinks = [
  {
    name: "Хянах самбар",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Цаг авалтууд",
    href: "/admin/bookings",
    icon: Calendar,
  },
  {
    name: "Захиалгууд",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    name: "Бүтээгдэхүүн",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Мэдэгдлүүд",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    name: "Тохиргоо",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { unreadCount } = useNotifications();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900">Мөнгөндент Админ</h1>
      </div>
      <nav className="mt-6">
        <ul className="space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    isActive && "bg-blue-50 text-blue-600 font-medium border-r-2 border-blue-600"
                  )}
                >
                  <link.icon className="w-5 h-5 mr-3" />
                  <span>{link.name}</span>
                  {link.name === "Мэдэгдлүүд" && (
                    <NotificationBadge count={unreadCount} className="ml-auto" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}