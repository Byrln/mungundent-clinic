"use client";

import { Search, User, LogOut, ExternalLink } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationsContext";
import NotificationsPopover from "./notifications/NotificationsPopover";
import Link from "next/link";

export default function AdminHeader() {
  const { logout } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
         
        </div>
        
        <div className="flex items-center space-x-4">
          <Link 
            href="/"
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none flex items-center space-x-1"
            target="_blank"
          >
            <ExternalLink className="w-5 h-5" />
            <span className="text-sm">Сайт руу очих</span>
          </Link>

          <NotificationsPopover />
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Админ</span>
            </div>
            
            <button 
              onClick={logout}
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none flex items-center space-x-1"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Гарах</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}