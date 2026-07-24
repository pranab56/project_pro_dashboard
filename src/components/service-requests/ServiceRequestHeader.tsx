"use client";

import React from "react";
import { Plus } from "lucide-react";

interface ServiceRequestHeaderProps {
  activeCount: number;
  onOpenModal: () => void;
}

export default function ServiceRequestHeader({
  activeCount,
  onOpenModal,
}: ServiceRequestHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Service Requests
        </h1>
        <p className="text-sm text-gray-500 font-normal mt-1">
          {activeCount} active · Click a Job ID to track progress
        </p>
      </div>

      <button
        type="button"
        onClick={onOpenModal}
        className="bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold px-5 py-3 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-2 text-sm w-fit"
      >
        <Plus className="w-4 h-4" />
        <span>New Service Request</span>
      </button>
    </div>
  );
}
