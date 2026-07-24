"use client";

import React, { useState } from "react";
import SettingsTabsNav, { SettingsTabType } from "@/components/settings/SettingsTabsNav";
import ProfileTab from "@/components/settings/ProfileTab";
import SecurityTab from "@/components/settings/SecurityTab";
import BillingTab from "@/components/settings/BillingTab";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabType>("profile");

  return (
    <div className="space-y-6 pb-10">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
          Manage your account preferences and settings
        </p>
      </div>

      {/* Main Layout (Left Tab Nav + Right Content Area) */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side Tab Bar */}
        <SettingsTabsNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Right Side Content Area */}
        <div className="flex-1 min-w-0">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "security" && <SecurityTab />}
          {activeTab === "billing" && <BillingTab />}
        </div>
      </div>
    </div>
  );
}