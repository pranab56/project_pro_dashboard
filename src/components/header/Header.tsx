"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import toast from "react-hot-toast";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { removeToken } from "../../utils/storage";

export default function Header() {
  const userName = "Alex Morgan";
  const userInitials = "AM";
  const notificationCount = 2;

  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMyProfile = () => {
    router.push("/settings");
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    removeToken();
    document.cookie = "cat-admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    toast.success("Logged out successfully");
    setIsDropdownOpen(false);
    router.push("/auth/login");
  };

  return (
    <header className="flex h-[81px] items-center justify-between px-3 sm:px-6 bg-[#EBEBEB] border-b border-gray-300 w-full shrink-0">
      {/* Left side - Sidebar Toggle & Slogan Header */}
      <div className="flex items-center gap-2 sm:gap-3">
        <SidebarTrigger className="p-2 text-gray-700 hover:bg-gray-200/80 rounded-xl cursor-pointer" />
        <div className="flex items-center gap-1 sm:gap-1.5 text-base sm:text-lg md:text-xl truncate">
          <span className="font-bold text-gray-900 tracking-tight">Property Care.</span>
          <span className="italic font-medium text-gray-700 hidden xs:inline sm:inline">Simplified</span>
        </div>
      </div>

      {/* Right side - Notification and Profile */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Notification Bell Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => router.push("/notifications")}
            className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-[#E2E2E5] hover:bg-gray-300/80 rounded-xl transition-colors cursor-pointer border border-gray-300/50"
            title="Notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF9F00] text-white font-bold text-[10px] rounded-full flex items-center justify-center border border-white">
                {notificationCount}
              </span>
            )}
          </button>
        </div>

        {/* User Profile Pill with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={handleProfileClick}
            className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1.5 bg-[#E2E2E5] hover:bg-gray-300/80 rounded-2xl border border-gray-300/50 transition-colors cursor-pointer"
          >
            {/* Initial Avatar Badge */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#8E25E3] text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {userInitials}
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-900 hidden sm:inline">{userName}</span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 ml-0.5" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-gray-200 bg-white py-1.5 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <button
                type="button"
                onClick={handleMyProfile}
                className="flex items-center gap-2.5 w-full px-4 py-2 text-sm font-medium cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <User className="w-4 h-4 text-gray-500" />
                <span>My Profile</span>
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-4 py-2 text-sm font-semibold cursor-pointer text-[#E53935] hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4 text-[#E53935]" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}