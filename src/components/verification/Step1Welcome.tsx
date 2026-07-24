"use client";

import React from "react";
import { ArrowRight, CheckCircle2, FileText, Info, Shield } from "lucide-react";

interface Step1WelcomeProps {
  onContinue: () => void;
}

export default function Step1Welcome({ onContinue }: Step1WelcomeProps) {
  return (
    <div className="space-y-6 max-w-3xl animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Welcome to <span className="text-[#6B1294]">ProjexPro</span>!
        </h1>
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mt-2">
          Account Created Successfully
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed mt-1">
          Great News - Your account setup is complete. To fully unlock all
          platform features please complete our property application. This
          helps us verify your business profile so we can grant your VIP
          partner perks, and premium platform features.
        </p>
      </div>

      {/* 3 Step Cards */}
      <div className="space-y-3">
        <div className="p-4 sm:p-5 bg-[#E2E2E5]/70 rounded-2xl border border-gray-300/60 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-purple-100 text-[#6B1294] shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">
              Complete Your Company Profile.{" "}
              <span className="text-xs font-normal text-gray-500">
                (Takes less than 5 minutes)
              </span>
            </h4>
            <p className="text-xs text-gray-600 font-normal mt-0.5">
              Fill in your contact and business details to get started.
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-[#E2E2E5]/70 rounded-2xl border border-gray-300/60 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-purple-100 text-[#6B1294] shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">Under Review</h4>
            <p className="text-xs text-gray-600 font-normal mt-0.5">
              ProjexPro Property Care team is verifying your information.
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-[#E2E2E5]/70 rounded-2xl border border-gray-300/60 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-purple-100 text-[#6B1294] shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">
              Unlock Full Access
            </h4>
            <p className="text-xs text-gray-600 font-normal mt-0.5">
              Start using all platform features once approved.
            </p>
          </div>
        </div>
      </div>

      {/* Warning Notice Box */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-800">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs font-medium leading-relaxed">
          Your submitted information will be reviewed by the platform
          administrator before your account is activated. You will not have
          access to platform features until approval is granted.
        </p>
      </div>

      {/* Actions */}
      <div className="pt-4">
        <button
          type="button"
          onClick={onContinue}
          className="py-3.5 px-6 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold rounded-lg text-sm transition-colors cursor-pointer shadow-sm flex items-center gap-2"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
