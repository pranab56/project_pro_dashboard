"use client";

import React, { useState, useEffect } from "react";
import { Clock, Shield, Sparkles } from "lucide-react";
import { VerificationFormData } from "@/types/verification";

interface Step5StatusPendingProps {
  formData: VerificationFormData;
  onAdminApproved: () => void;
  onEdit?: () => void;
}

export default function Step5StatusPending({
  formData,
  onAdminApproved,
}: Step5StatusPendingProps) {
  const [progress, setProgress] = useState(15);
  const [reviewStage, setReviewStage] = useState("Verifying organization details...");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(45);
      setReviewStage("Checking portfolio credentials...");
    }, 1500);

    const timer2 = setTimeout(() => {
      setProgress(85);
      setReviewStage("Granting admin approval permission...");
    }, 3000);

    const timer3 = setTimeout(() => {
      setProgress(100);
      onAdminApproved();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onAdminApproved]);

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

      {/* Progress Bar & Stage indicator */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-lg mx-auto">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-gray-700">{reviewStage}</span>
          <span className="font-medium text-[#5B1B95]">{progress}%</span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden border border-gray-200">
          <div
            className="bg-[#5B1B95] h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-[11px] text-gray-500 font-normal">
          Verification is fast and automated. Once approved by admin, you will choose your subscription plan.
        </p>
      </div>

      {/* Fast-forward Demo Action Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onAdminApproved}
          className="px-5 py-2.5 bg-purple-50 hover:bg-purple-100 text-[#5B1B95] font-bold text-xs rounded-xl border border-purple-200 transition-colors cursor-pointer inline-flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 text-[#5B1B95]" />
          <span>Simulate Instant Admin Approval →</span>
        </button>
      </div>
    </div>
  );
}
