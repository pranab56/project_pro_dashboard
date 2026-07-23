"use client";

import { Building2, CheckCircle2, Receipt, Wrench } from "lucide-react";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// 12 Months Service Requests Data matching the screenshot
const serviceRequestsData = [
  { month: "Jan", volume: 11 },
  { month: "Feb", volume: 18 },
  { month: "Mar", volume: 14 },
  { month: "Apr", volume: 21 },
  { month: "May", volume: 17 },
  { month: "Jun", volume: 25 },
  { month: "Jul", volume: 25 },
  { month: "Aug", volume: 25 },
  { month: "Sep", volume: 25 },
  { month: "Oct", volume: 25 },
  { month: "Nov", volume: 25 },
  { month: "Dec", volume: 25 },
];

const recentActivities = [
  {
    id: 1,
    icon: Wrench,
    iconBg: "bg-[#F2E7FC] text-[#8E25E3]",
    text: "Service request SR-003 assigned to John Smith",
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: Building2,
    iconBg: "bg-blue-100 text-blue-600",
    text: "Harbor View Plaza status updated to Active",
    time: "5 hours ago",
  },
  {
    id: 3,
    icon: Receipt,
    iconBg: "bg-amber-100 text-amber-600",
    text: "Invoice INV-001 generated for $1,200",
    time: "1 day ago",
  },
  {
    id: 4,
    icon: Building2,
    iconBg: "bg-blue-100 text-blue-600",
    text: "New property Pine Ridge Townhomes added",
    time: "1 day ago",
  },
  {
    id: 5,
    icon: CheckCircle2,
    iconBg: "bg-green-100 text-green-600",
    text: "Maintenance request SR-002 resolved for Sunset Apts",
    time: "2 days ago",
  },
];

export default function Overview(): React.ReactElement {
  return (
    <div className="space-y-6">
      {/* Header Greeting */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
          Hi Alex 👋
        </h1>
        <p className="text-sm text-gray-500 font-normal mt-1">
          Welcome to your premium property dashboard.
        </p>
      </div>

      {/* Top 4 Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total Properties */}
        <div className="bg-[#E2E2E5] border border-gray-300/50 rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs sm:text-sm font-medium text-gray-500">
              Total Properties
            </span>
            <div className="p-2.5 rounded-xl bg-[#F2E7FC] text-[#8E25E3]">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-3xl font-bold text-gray-900">10</h2>
            <p className="text-xs font-semibold text-[#8E25E3] mt-1">
              5 Units | 50% Occupied
            </p>
          </div>
        </div>

        {/* Card 2: Active Jobs */}
        <div className="bg-[#E2E2E5] border border-gray-300/50 rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs sm:text-sm font-medium text-gray-500">
              Active Jobs
            </span>
            <div className="p-2.5 rounded-xl bg-green-100 text-green-600">
              <Wrench className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-3xl font-bold text-gray-900">8</h2>
            <p className="text-xs font-semibold text-green-600 mt-1">
              3 urgent
            </p>
          </div>
        </div>

        {/* Card 3: Approval Required */}
        <div className="bg-[#E2E2E5] border border-gray-300/50 rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs sm:text-sm font-medium text-gray-500">
              Approval Required
            </span>
            <div className="p-2.5 rounded-xl bg-red-100 text-red-600">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-3xl font-bold text-gray-900">4</h2>
            <p className="text-xs font-semibold text-red-600 mt-1">
              Need Attention
            </p>
          </div>
        </div>

        {/* Card 4: Jobs Completed */}
        <div className="bg-[#E2E2E5] border border-gray-300/50 rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs sm:text-sm font-medium text-gray-500">
              Jobs Completed
            </span>
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600">
              <Wrench className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-3xl font-bold text-gray-900">50</h2>
            <p className="text-xs font-semibold text-blue-600 mt-1">
              12 this month
            </p>
          </div>
        </div>
      </div>

      {/* Service Requests Bar Chart Section */}
      <div className="bg-[#E2E2E5] border border-gray-300/50 rounded-2xl p-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">Service Requests</h2>
          <p className="text-xs text-gray-500 font-normal mt-0.5">Yearly volume</p>
        </div>

        <div className="h-[270px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={serviceRequestsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D4D4D8" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                ticks={[0, 7, 14, 21, 28]}
                domain={[0, 28]}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
                labelStyle={{ fontWeight: 600, color: "#111827" }}
                formatter={(val: number) => [`${val} requests`, "Volume"]}
              />
              <Bar
                dataKey="volume"
                fill="#8E25E3"
                radius={[6, 6, 0, 0]}
                barSize={34}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-[#E2E2E5] border border-gray-300/50 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>

        <div className="space-y-4">
          {recentActivities.map((act) => {
            const IconComp = act.icon;
            return (
              <div key={act.id} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl flex items-center justify-center ${act.iconBg}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {act.text}
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-normal whitespace-nowrap">
                  {act.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}