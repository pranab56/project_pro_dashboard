"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Clock, Info, Pencil, Trash2 } from "lucide-react";
import { VerificationFormData } from "@/types/verification";
import toast from "react-hot-toast";

interface Step5StatusPendingProps {
  formData: VerificationFormData;
  onEdit: () => void;
  onReset: () => void;
}

export default function Step5StatusPending({
  formData,
  onEdit,
  onReset,
}: Step5StatusPendingProps) {
  const router = useRouter();

  return (
    <div className="space-y-6 max-w-3xl animate-in fade-in duration-300">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Application Status
          </h1>
          <p className="text-xs uppercase font-bold tracking-wider text-gray-500 mt-1">
            YOUR APPLICATION IS UNDER REVIEW
          </p>
        </div>

        {/* Status Amber Pill Badge */}
        <div className="px-3.5 py-1.5 bg-amber-100/90 border border-amber-300 text-amber-800 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-2xs">
          <Clock className="w-4 h-4 text-amber-700" />
          <span>Status: Pending Review</span>
        </div>
      </div>

      {/* Blue Info Notice Box */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3 text-blue-900">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-xs font-medium leading-relaxed">
          Your application is currently being reviewed by our Property care team.
          We will provide a status update within 1-3 business days.
        </p>
      </div>

      {/* Submitted Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">
            SUBMITTED ON
          </span>
          <span className="text-sm font-semibold text-gray-900 block mt-1">
            Jun 26, 2026 · 09:42 AM
          </span>
        </div>

        <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">
            BUSINESS
          </span>
          <span className="text-sm font-semibold text-gray-900 block mt-1">
            {formData.companyName}
          </span>
        </div>

        <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">
            CONTACT
          </span>
          <span className="text-sm font-semibold text-gray-900 block mt-1">
            {formData.fullName}
          </span>
        </div>

        <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">
            EMAIL
          </span>
          <span className="text-sm font-semibold text-gray-900 block mt-1 truncate">
            {formData.businessEmail}
          </span>
        </div>
      </div>

      {/* Submitted Details Box */}
      <div className="p-5 bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] space-y-3">
        <h3 className="text-sm font-bold text-gray-900">Submitted Details</h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between border-b border-gray-300/40 pb-1.5">
            <span className="text-gray-500 font-medium">Portfolio Size</span>
            <span className="font-semibold text-gray-900">
              {formData.portfolioSize}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-300/40 pb-1.5">
            <span className="text-gray-500 font-medium">Location</span>
            <span className="font-semibold text-gray-900">
              {formData.city}, {formData.state}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-300/40 pb-1.5">
            <span className="text-gray-500 font-medium">Maintenance</span>
            <span className="font-semibold text-gray-900 text-right max-w-xs">
              {formData.maintenance}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Property Types</span>
            <span className="font-semibold text-gray-900">
              {formData.propertyTypes.join(", ") || "None"}
            </span>
          </div>
        </div>
      </div>

      {/* Take Actions Box */}
      <div className="p-5 bg-[#F2E7FC]/80 border border-purple-200 rounded-2xl space-y-3">
        <span className="text-xs uppercase font-bold tracking-wider text-[#6B1294] block">
          TAKE ACTIONS
        </span>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={onEdit}
            className="py-2.5 px-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-xl text-xs border border-gray-300/80 transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <Pencil className="w-3.5 h-3.5 text-[#6B1294]" />
            <span>Edit Information</span>
          </button>

          <button
            type="button"
            onClick={() => {
              toast.success("Application request deleted.");
              onReset();
            }}
            className="py-2.5 px-4 bg-red-50 hover:bg-red-100 text-[#E53935] font-semibold rounded-xl text-xs border border-red-200 transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <Trash2 className="w-3.5 h-3.5 text-[#E53935]" />
            <span>Delete</span>
          </button>

          <button
            type="button"
            onClick={() => router.push("/properties")}
            className="py-2.5 px-5 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs ml-auto"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
