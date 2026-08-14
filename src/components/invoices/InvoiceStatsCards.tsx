"use client";

import React from "react";
import { AlertCircle, CheckCircle2, Clock, DollarSign } from "lucide-react";

interface InvoiceStatsProps {
  totalBalanceDue: number;
  overdueCount: number;
  pendingCount: number;
  paidHistoryAmount: number;
}

export default function InvoiceStatsCards({
  totalBalanceDue = 5000,
  overdueCount = 6,
  pendingCount = 5,
  paidHistoryAmount = 54000,
}: InvoiceStatsProps) {
  // Format Currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Balance Due Card (Purple - Matches Balance Due Status) */}
      <div className="bg-[#8E25E3] text-white rounded-lg p-5 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
        <div>
          <p className="text-xs sm:text-sm font-medium text-white/90">
            Total Balance Due
          </p>
          <h3 className="text-3xl font-bold mt-2 tracking-tight">
            {formatCurrency(totalBalanceDue)}
          </h3>
        </div>
        <div className="w-11 h-11 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0">
          <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
        </div>
      </div>

      {/* 2. Overdue Invoices Card (Red - Matches Overdue Status) */}
      <div className="bg-[#E53935] text-white rounded-lg p-5 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
        <div>
          <p className="text-xs sm:text-sm font-medium text-white/90">
            Overdue Invoices
          </p>
          <h3 className="text-3xl font-bold mt-2 tracking-tight">
            {overdueCount}
          </h3>
        </div>
        <div className="w-11 h-11 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0">
          <AlertCircle className="w-6 h-6 stroke-[2.2]" />
        </div>
      </div>

      {/* 3. Pending Approvals Card (Amber/Orange - Matches Deposit/Pending Status) */}
      <div className="bg-[#D97706] text-white rounded-lg p-5 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
        <div>
          <p className="text-xs sm:text-sm font-medium text-white/90">
            Pending Approvals
          </p>
          <h3 className="text-3xl font-bold mt-2 tracking-tight">
            {pendingCount}
          </h3>
        </div>
        <div className="w-11 h-11 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0">
          <Clock className="w-6 h-6 stroke-[2.2]" />
        </div>
      </div>

      {/* 4. Paid History Card (Green - Matches Paid Status) */}
      <div className="bg-[#16A34A] text-white rounded-lg p-5 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
        <div>
          <p className="text-xs sm:text-sm font-medium text-white/90">
            Paid History
          </p>
          <h3 className="text-3xl font-bold mt-2 tracking-tight">
            {formatCurrency(paidHistoryAmount)}
          </h3>
        </div>
        <div className="w-11 h-11 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0">
          <DollarSign className="w-6 h-6 stroke-[2.2]" />
        </div>
      </div>
    </div>
  );
}
