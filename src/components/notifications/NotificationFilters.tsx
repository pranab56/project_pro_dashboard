"use client";

import React from "react";
import { Search } from "lucide-react";
import { NotificationCategory } from "@/types/notification";

interface NotificationFiltersProps {
  activeTab: NotificationCategory;
  onTabChange: (tab: NotificationCategory) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  unreadCount: number;
}

export default function NotificationFilters({
  activeTab,
  onTabChange,
  searchTerm,
  onSearchChange,
  unreadCount,
}: NotificationFiltersProps) {
  const tabs: { key: NotificationCategory; label: string; count?: number }[] = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread", count: unreadCount },
    { key: "service_request", label: "Service Requests" },
    { key: "invoice", label: "Invoices" },
    { key: "property", label: "Properties" },
    { key: "system", label: "System" },
  ];

  return (
    <div className="bg-[#E2E2E5] border border-gray-300/50 rounded-lg p-2 sm:p-2.5 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Search Input Bar */}
      <div className="relative w-full md:w-7/12">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search notifications..."
          className="w-full pl-10 pr-4 py-3 bg-[#EAEAEA] border border-gray-300/40 rounded-sm text-sm text-gray-900 placeholder:text-gray-400 focus:bg-[#EAEAEA] focus:border-[#A3A3A3] focus:outline-none transition-all"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-[#DEDEE1] p-1.5 rounded-sm w-full md:w-5/12 overflow-x-auto">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={`px-3 py-2 rounded-sm text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${isSelected
                  ? "bg-white text-gray-900 font-semibold shadow-2xs"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className="bg-[#FF9F00] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
