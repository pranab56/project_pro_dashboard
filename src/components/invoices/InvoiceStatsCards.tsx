"use client";

import React from "react";
import { AlertCircle, CheckCircle2, Clock, DollarSign } from "lucide-react";

interface InvoiceStatsProps {
  totalInvoicesCount: number;
  pendingAmount: number;
  overdueAmount: number;
  totalBalanceDue: number;
}

export default function InvoiceStatsCards({
  totalInvoicesCount,
  pendingAmount,
  overdueAmount,
  totalBalanceDue,
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
      {/* 1. Total Invoices Card (Purple) */}
      <div className="bg-[#7B70E5] text-white rounded-2xl p-5 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
        <div>
          <p className="text-xs sm:text-sm font-medium text-white/90">
            Total Invoices
          </p>
          <h3 className="text-3xl font-bold mt-2 tracking-tight">
            {totalInvoicesCount}
          </h3>
        </div>
        <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0">
          <DollarSign className="w-6 h-6 stroke-[2.5]" />
        </div>
      </div>

      {/* 2. Pending Amount Card (Orange/Amber) */}
      <div className="bg-[#F59E0B] text-white rounded-2xl p-5 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
        <div>
          <p className="text-xs sm:text-sm font-medium text-white/90">
            Pending Amount
          </p>
          <h3 className="text-3xl font-bold mt-2 tracking-tight">
            {formatCurrency(pendingAmount)}
          </h3>
        </div>
        <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0">
          <Clock className="w-6 h-6 stroke-[2.5]" />
        </div>
      </div>

      {/* 3. Overdue Card (Red) */}
      <div className="bg-[#E53935] text-white rounded-2xl p-5 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
        <div>
          <p className="text-xs sm:text-sm font-medium text-white/90">Overdue</p>
          <h3 className="text-3xl font-bold mt-2 tracking-tight">
            {formatCurrency(overdueAmount)}
          </h3>
        </div>
        <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0">
          <AlertCircle className="w-6 h-6 stroke-[2.5]" />
        </div>
      </div>

      {/* 4. Total Balance Due Card (Green) */}
      <div className="bg-[#10B981] text-white rounded-2xl p-5 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
        <div>
          <p className="text-xs sm:text-sm font-medium text-white/90">
            Total Balance Due
          </p>
          <h3 className="text-3xl font-bold mt-2 tracking-tight">
            {formatCurrency(totalBalanceDue)}
          </h3>
        </div>
        <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0">
          <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
}
