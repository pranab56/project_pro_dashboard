"use client";

import React from "react";

interface ServiceRequestStatsProps {
  pendingCount: number;
  assignedCount: number;
  inProgressCount: number;
  completedCount: number;
  cancelledCount: number;
}

export default function ServiceRequestStats({
  pendingCount,
  assignedCount,
  inProgressCount,
  completedCount,
  cancelledCount,
}: ServiceRequestStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {/* Pending */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-4 flex flex-col justify-between">
        <span className="text-2xl font-bold text-[#FF9F00]">{pendingCount}</span>
        <span className="text-xs font-medium text-gray-500 mt-1">Pending</span>
      </div>

      {/* Assigned */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-4 flex flex-col justify-between">
        <span className="text-2xl font-bold text-[#2563EB]">{assignedCount}</span>
        <span className="text-xs font-medium text-gray-500 mt-1">Assigned</span>
      </div>

      {/* In Progress */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-4 flex flex-col justify-between">
        <span className="text-2xl font-bold text-[#8E25E3]">{inProgressCount}</span>
        <span className="text-xs font-medium text-gray-500 mt-1">In Progress</span>
      </div>

      {/* Completed */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-4 flex flex-col justify-between">
        <span className="text-2xl font-bold text-[#16A34A]">{completedCount}</span>
        <span className="text-xs font-medium text-gray-500 mt-1">Completed</span>
      </div>

      {/* Cancelled */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-4 flex flex-col justify-between">
        <span className="text-2xl font-bold text-[#DC2626]">{cancelledCount}</span>
        <span className="text-xs font-medium text-gray-500 mt-1">Cancelled</span>
      </div>
    </div>
  );
}
