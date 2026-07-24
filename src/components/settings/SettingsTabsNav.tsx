"use client";

import React from "react";
import { CreditCard, Shield, User } from "lucide-react";

export type SettingsTabType = "profile" | "security" | "billing";

interface SettingsTabsNavProps {
  activeTab: SettingsTabType;
  onTabChange: (tab: SettingsTabType) => void;
}

export default function SettingsTabsNav({
  activeTab,
  onTabChange,
}: SettingsTabsNavProps) {
  const navItems: { id: SettingsTabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <div className="w-full lg:w-64 shrink-0 bg-[#EAEAEA] border border-gray-300/60 rounded-2xl p-2 sm:p-3 h-fit overflow-x-auto">
      <div className="flex flex-row lg:flex-col gap-1.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer w-full text-left ${
                isActive
                  ? "bg-[#E1D4F4] text-[#6B1294] shadow-2xs"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-[#6B1294]" : "text-gray-500"}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
