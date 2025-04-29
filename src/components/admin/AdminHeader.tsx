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
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Хайх..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
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