"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import toast from "react-hot-toast";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { removeToken } from "../../utils/storage";

export default function Header() {
  const userName = "Alex Morgan";
  const userInitials = "AM";
  const notificationCount = 2;

  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isServiceProvider = pathname?.startsWith("/services_provider");
  const userRole = isServiceProvider ? "Service Provider" : "Property Manager";

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
    if (isServiceProvider) {
      router.push("/services_provider/profile");
    } else {
      router.push("/settings");
    }
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
    <header className="flex h-[81px] items-center justify-between px-3 sm:px-6 bg-[#FFFFFF] border-b border-[#E5E7EB] w-full shrink-0">
      {/* Left side - Sidebar Toggle & Slogan Header */}
      <div className="flex items-center gap-2 sm:gap-3">
        <SidebarTrigger className="p-2 text-gray-700 hover:bg-gray-200/80 rounded-lg cursor-pointer" />
      </div>

      {/* Right side - Notification and Profile */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Notification Bell Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => router.push("/notifications")}
            className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-[#FFFFFF] hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-[#E5E7EB] shadow-2xs"
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
        <div className="relative inline-block" ref={dropdownRef}>
          <button
            type="button"
            onClick={handleProfileClick}
            className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1.5 bg-[#FFFFFF] hover:bg-gray-50 rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer shadow-2xs w-full"
          >
            {/* Initial Avatar Badge */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#8E25E3] text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
              {userInitials}
            </div>
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-xs sm:text-sm font-bold text-gray-900">{userName}</span>
              <span className="text-[10px] font-semibold text-[#8E25E3]">{userRole}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 ml-0.5 shrink-0" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 w-full min-w-full rounded-lg border border-gray-200 bg-white py-1.5 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
              <button
                type="button"
                onClick={handleMyProfile}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-xs sm:text-sm font-medium cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <User className="w-4 h-4 text-gray-500 shrink-0" />
                <span className="truncate">My Profile</span>
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-4 py-2 text-xs sm:text-sm font-semibold cursor-pointer text-[#E53935] hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4 text-[#E53935] shrink-0" />
                <span className="truncate">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}