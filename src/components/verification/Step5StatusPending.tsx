"use client";

import { Clock, Shield } from "lucide-react";
import { VerificationFormData } from "@/types/verification";

interface Step5StatusPendingProps {
  formData: VerificationFormData;
}

export default function Step5StatusPending({
  formData,
}: Step5StatusPendingProps) {


  return (
    <div className="space-y-6 max-w-2xl mx-auto py-8 px-4 text-center animate-in fade-in duration-300">

      {/* Animated Shield / Pulse Icon */}
      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-purple-400/20 animate-ping" />
        <div className="w-20 h-20 rounded-full bg-purple-100 border-2 border-[#5B1B95] text-[#5B1B95] flex items-center justify-center shadow-lg relative z-10">
          <Shield className="w-10 h-10 animate-bounce" />
        </div>
      </div>
      {/* Header text */}
      <div className="space-y-2">
        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border border-amber-300">
          <Clock className="w-3.5 h-3.5 text-amber-700 animate-spin" />
          <span>Admin Review In Progress</span>
        </span>
        <h1 className="text-2xl sm:text-3xl font-medium text-[#2E0054] tracking-tight">
          Your Documents Are Being Reviewed
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 font-normal max-w-lg mx-auto leading-relaxed">
          Thank you, <strong className="text-gray-900">{formData.fullName}</strong>. Our ProjexPro platform admin is reviewing <strong className="text-gray-900">{formData.companyName}</strong>&apos;s verification application.
        </p>
      </div>

    </div>
  );
}
