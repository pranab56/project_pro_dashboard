"use client";

import React from "react";
import { Check, ArrowRight, FileText } from "lucide-react";

interface Step6AccountApprovedProps {
  onChoosePlan: () => void;
  contactName?: string;
}

export default function Step6AccountApproved({
  onChoosePlan,
  contactName = "Alex",
}: Step6AccountApprovedProps) {
  return (
    <div className="flex items-center justify-center py-6 px-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-xl w-full text-center border border-gray-100 shadow-xl space-y-6">

        {/* Top Gold Checkmark Icon Circle */}
        <div className="mx-auto w-16 h-16 rounded-full border-2 border-amber-500/80 bg-amber-50/50 flex items-center justify-center">
          <Check className="w-8 h-8 text-amber-600 stroke-[2.5]" />
        </div>

        {/* Header Title & Subtitle matching project color */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-medium text-[#4C127D] tracking-tight leading-tight">
            Your ProjexPro Account Has Been Approved.
          </h1>
          <p className="text-sm font-semibold text-gray-500 mt-1">
            From ProjexPro
          </p>

          {/* Accent Line Divider */}
          <div className="w-16 h-1 bg-amber-400 rounded-full mx-auto mt-4" />
        </div>

        {/* Body Text */}
        <div className="text-left space-y-3 pt-2">
          <h2 className="text-base font-bold text-gray-900">
            Hi {contactName.split(" ")[0]},
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
            Your organization has been verified and approved. Select a subscription plan to activate your workspace and begin managing your portfolio through ProjexPro.
          </p>
        </div>

        {/* Primary Action Button matching project brand color #6B1294 */}
        <div className="pt-2 space-y-3">
          <button
            type="button"
            onClick={onChoosePlan}
            className="w-full py-4 px-6 bg-[#6B1294] hover:bg-[#580e7d] text-white font-bold rounded-2xl text-sm sm:text-base transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <span>Choose Your Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-gray-400 font-normal">
            This secure link takes you to your ProjexPro dashboard to select a plan.
          </p>
        </div>

        {/* Bottom Note Box */}
        <div className="p-4 sm:p-5 bg-[#FFFBEB] border border-amber-200/70 rounded-2xl text-left flex items-start gap-3.5 text-amber-900">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-amber-950">
              Please note:
            </h4>
            <p className="text-xs text-amber-900/90 font-normal mt-0.5 leading-relaxed">
              Service-provider work is separately quoted and invoiced after authorization.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
