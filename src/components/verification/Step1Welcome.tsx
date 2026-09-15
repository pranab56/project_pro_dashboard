"use client";

import React from "react";
import { ArrowRight, Building2, PieChart, ClipboardCheck, Clock } from "lucide-react";

interface Step1WelcomeProps {
  onContinue: () => void;
}

export default function Step1Welcome({ onContinue }: Step1WelcomeProps) {
  return (
    <div className="space-y-6 max-w-3xl animate-in fade-in duration-300">
      {/* Top Header matching screenshot */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-medium text-[#5B1B95] tracking-tight">
          Welcome to ProjexPro
        </h1>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-1">
          Your business account has been created.
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed mt-2 max-w-2xl">
          Next, complete your Company & Portfolio Profile so we can verify your organization and prepare your ProjexPro workspace.
        </p>

        {/* Time Estimate Pill */}
        <div className="inline-flex items-center gap-2 bg-gray-100/90 border border-gray-200/80 px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-700 mt-4">
          <Clock className="w-3.5 h-3.5 text-gray-500" />
          <span>Estimated time: 5–10 minutes</span>
        </div>
      </div>

      {/* 3 Step List Cards */}
      <div className="space-y-3.5 pt-1">
        {/* Card 1 */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-gray-200/80 shadow-2xs flex items-center gap-4 hover:border-purple-200 transition-colors">
          <div className="w-11 h-11 rounded-xl bg-purple-100 text-[#5B1B95] flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              1. Company Profile
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
              Add your organization and business-contact details.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-gray-200/80 shadow-2xs flex items-center gap-4 hover:border-purple-200 transition-colors">
          <div className="w-11 h-11 rounded-xl bg-purple-100 text-[#5B1B95] flex items-center justify-center shrink-0">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              2. Portfolio Profile
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
              Share your portfolio size, properties, markets, and operational needs.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-gray-200/80 shadow-2xs flex items-center gap-4 hover:border-purple-200 transition-colors">
          <div className="w-11 h-11 rounded-xl bg-purple-100 text-[#5B1B95] flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              3. Review & Submit
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
              Confirm your information and submit it for verification.
            </p>
          </div>
        </div>
      </div>

      {/* Info Notice Box matching screenshot */}
      <div className="p-4 sm:p-5 bg-[#FFFBEB] border border-amber-200/80 rounded-2xl flex items-start gap-3.5 text-amber-900">
        <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
          i
        </div>
        <p className="text-xs sm:text-sm font-normal leading-relaxed text-amber-900/90">
          Workspace access begins after approval. Until approved, you cannot add properties, invite team members, create work orders, or access marketplace features.
        </p>
      </div>

      {/* Action Buttons matching screenshot */}
      <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => alert("Progress saved.")}
          className="text-xs sm:text-sm text-gray-600 font-semibold hover:text-[#5B1B95] underline cursor-pointer"
        >
          Save and finish later
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="py-3 px-6 bg-[#5B1B95] hover:bg-[#4a157d] text-white font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer shadow-sm flex items-center gap-2"
        >
          <span>Continue to Company Profile</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
