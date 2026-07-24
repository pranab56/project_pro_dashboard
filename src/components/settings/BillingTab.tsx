"use client";

import React from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

export default function BillingTab() {
  const handleDownloadInvoice = (date: string) => {
    toast.success(`Downloading invoice for ${date}...`);
  };

  const handleAddPayment = () => {
    toast.success("Add Payment Method dialog opened");
  };

  const handleChangePlan = () => {
    toast.success("Change plan options opened");
  };

  const handleCancelPlan = () => {
    toast.error("Cancel subscription requested");
  };

  const historyItems = [
    { id: "1", title: "Professional Plan", date: "Jun 1, 2026", amount: "$99.00", status: "Paid" },
    { id: "2", title: "Professional Plan", date: "May 1, 2026", amount: "$99.00", status: "Paid" },
    { id: "3", title: "Professional Plan", date: "Apr 1, 2026", amount: "$99.00", status: "Paid" },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Current Plan Card */}
      <div className="bg-[#EAEAEA] border border-gray-300/60 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">
          Current Plan
        </h3>

        {/* Banner */}
        <div className="bg-[#E1D4F4]/80 border border-purple-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-bold text-gray-900">
                Professional Plan
              </h4>
              <span className="bg-[#5B1B95] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 font-normal">
              Unlimited properties · 5 team members · All features
            </p>
            <p className="text-xs font-semibold text-[#5B1B95] pt-1">
              Next billing: July 1, 2026
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-3xl font-extrabold text-gray-900">$99</span>
            <span className="text-xs text-gray-500 font-medium ml-1">/month</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={handleChangePlan}
            className="bg-[#E2E2E5] hover:bg-gray-300 text-gray-800 font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm border border-gray-300/60 transition-colors cursor-pointer"
          >
            Change Plan
          </button>
          <button
            type="button"
            onClick={handleCancelPlan}
            className="bg-red-50/80 hover:bg-red-100 text-[#E53935] border border-red-300 font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Cancel Plan
          </button>
        </div>
      </div>

      {/* 2. Payment Method Card */}
      <div className="bg-[#EAEAEA] border border-gray-300/60 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">
          Payment Method
        </h3>

        <div className="bg-[#E2E2E5]/80 border border-gray-300/60 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-black text-white px-2.5 py-1 text-xs font-black tracking-widest rounded-md shrink-0">
              VISA
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Visa ending in 4242
              </p>
              <p className="text-xs text-gray-500 font-normal mt-0.5">
                Expires 08/2028
              </p>
            </div>
          </div>

          <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            Default
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddPayment}
          className="bg-[#E1D4F4] hover:bg-purple-200 text-[#5B1B95] font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-1.5 border border-purple-200 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Payment Method</span>
        </button>
      </div>

      {/* 3. Billing History Card */}
      <div className="bg-[#EAEAEA] border border-gray-300/60 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">
          Billing History
        </h3>

        <div className="divide-y divide-gray-300/60">
          {historyItems.map((item) => (
            <div
              key={item.id}
              className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-sm font-bold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500 font-normal mt-0.5">
                  {item.date}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-900">
                  {item.amount}
                </span>

                <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {item.status}
                </span>

                <button
                  type="button"
                  onClick={() => handleDownloadInvoice(item.date)}
                  className="text-[#5B1B95] hover:text-purple-900 font-semibold text-xs sm:text-sm hover:underline cursor-pointer"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
