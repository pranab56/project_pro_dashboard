"use client";

import React, { useState } from "react";
import { Check, Crown, ArrowRight, Sparkles } from "lucide-react";

export interface SelectedPlanInfo {
  id: string;
  name: string;
  pricePerUnit: number;
  monthlyMinimum: number;
  activeUnits: number;
  estimatedTotal: number;
}

interface Step7ChoosePlanProps {
  onSelectPlan: (plan: SelectedPlanInfo) => void;
  portfolioSizeText?: string;
}

export default function Step7ChoosePlan({
  onSelectPlan,
}: Step7ChoosePlanProps) {
  const [selectedPlanId, setSelectedPlanId] = useState("plan-pro");

  const plans = [
    {
      id: "plan-prime",
      title: "PRIME",
      tagline: "For property managers starting out with core operational tools",
      pricePerUnit: 1.0,
      unitRange: "Up to 1,000 Units",
      minimumText: "$500 monthly min.",
      monthlyMinimum: 500,
      isPopular: false,
      benefits: [
        "Work Order & Ticket Management",
        "Tenant & Vendor Communication",
        "Basic Invoice & Payment Processing",
        "Automated Monthly Financial Reporting",
        "Email Customer Support",
      ],
    },
    {
      id: "plan-pro",
      title: "ProjexPro Pro",
      tagline: "For property professionals ready to streamline operations",
      pricePerUnit: 2.0,
      unitRange: "1,000 – 15,000 Units",
      minimumText: "$2,000 monthly min. | 1,000-door min.",
      monthlyMinimum: 2000,
      isPopular: true,
      badgeText: "MOST POPULAR",
      benefits: [
        "All Prime features, plus",
        "Renovation & Turnover Workspace",
        "Multi-Vendor Bidding & Comparison",
        "Milestone-Based Project Approvals",
        "Vendor Performance & Compliance Tracking",
        "Priority Access to Vetted Marketplace",
        "Priority 24/7 Account Support",
      ],
    },
    {
      id: "plan-enterprise",
      title: "ENTERPRISE",
      tagline: "For enterprise portfolio leaders needing custom scale & SLA support",
      pricePerUnit: 3.5,
      unitRange: "15,000+ Units",
      minimumText: "Custom monthly min. | Enterprise SLA",
      monthlyMinimum: 3500,
      isPopular: false,
      benefits: [
        "All Pro features, plus",
        "Unlimited Property Units & Portfolios",
        "Instant Emergency Job Matching",
        "API Integration & Webhooks",
        "Dedicated Account Manager (24/7)",
        "Custom SLA Guarantee (99.9%)",
      ],
    },
  ];

  const handleProceed = () => {
    const target = plans.find((p) => p.id === selectedPlanId) || plans[1];
    const activeUnits = 1250;
    const calcSub = activeUnits * target.pricePerUnit;
    const estimatedTotal = Math.max(calcSub, target.monthlyMinimum);

    onSelectPlan({
      id: target.id,
      name: target.title,
      pricePerUnit: target.pricePerUnit,
      monthlyMinimum: target.monthlyMinimum,
      activeUnits,
      estimatedTotal,
    });
  };

  return (
    <div className="space-y-6  animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3 py-1 bg-purple-100 text-[#6B1294] font-bold text-xs rounded-full inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#6B1294]" />
          <span>Step 2 of Verification Activation</span>
        </span>
        <h1 className="text-2xl sm:text-3xl font-medium text-[#4C127D] tracking-tight">
          Select Your Workspace Plan
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 font-normal">
          Choose the plan that fits your portfolio. Plans set by Super Admin. You can change your plan anytime.
        </p>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 w-full">
        {plans.map((p) => {
          const isSelected = selectedPlanId === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setSelectedPlanId(p.id)}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all cursor-pointer relative ${isSelected
                  ? "border-2 border-[#6B1294] bg-purple-50/40"
                  : "border border-gray-200 bg-white hover:border-purple-300"
                }`}
            >
              {p.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#6B1294] text-white text-[10px] font-medium px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Crown className="w-3 h-3 text-amber-400" />
                  <span>{p.badgeText}</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{p.title}</h3>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? "border-[#6B1294] bg-[#6B1294] text-white" : "border-gray-300"
                      }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <p className="text-xs text-gray-500 font-normal leading-relaxed">{p.tagline}</p>

                {/* Price */}
                <div className="border-t border-b border-gray-100 py-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-medium text-gray-900">${p.pricePerUnit.toFixed(2)}</span>
                    <span className="text-xs text-gray-500 font-medium">/ unit / month</span>
                  </div>
                  <p className="text-[11px] text-[#6B1294] font-semibold mt-0.5">{p.minimumText}</p>
                </div>

                {/* Benefits */}
                <div className="space-y-2 text-xs">
                  {p.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-gray-700 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Select Button */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlanId(p.id);
                    handleProceed();
                  }}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${isSelected
                      ? "bg-[#6B1294] hover:bg-[#580e7d] text-white shadow-md"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }`}
                >
                  {isSelected ? "Plan Selected ✓" : "Select Plan"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Row */}
      <div className="flex items-center justify-end pt-4">
        <button
          type="button"
          onClick={handleProceed}
          className="py-3.5 px-8 bg-[#6B1294] hover:bg-[#580e7d] text-white font-bold rounded-xl text-sm transition-colors cursor-pointer shadow-md flex items-center gap-2"
        >
          <span>Proceed to Billing & Activation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
