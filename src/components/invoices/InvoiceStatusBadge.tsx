"use client";

import React from "react";
import { AlertCircle, Check, Clock } from "lucide-react";
import { InvoiceStatus } from "@/types/invoice";

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
}

export default function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  switch (status) {
    case "Deposit":
    case "Pending":
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#FDF3D6] text-[#D97706] border border-[#FDE68A]">
          <Clock className="w-3.5 h-3.5 text-[#D97706]" />
          <span>{status}</span>
        </span>
      );

    case "Balance Due":
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#EDE7F6] text-[#8E25E3] border border-[#DDD6FE]">
          <Clock className="w-3.5 h-3.5 text-[#8E25E3]" />
          <span>Balance Due</span>
        </span>
      );

    case "Overdue":
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#FDE8E8] text-[#E53935] border border-[#FCA5A5]">
          <AlertCircle className="w-3.5 h-3.5 text-[#E53935]" />
          <span>Overdue</span>
        </span>
      );

    case "Paid":
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#E6F4EA] text-[#16A34A] border border-[#BBF7D0]">
          <Check className="w-3.5 h-3.5 text-[#16A34A]" />
          <span>Paid</span>
        </span>
      );

    default:
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
          {status}
        </span>
      );
  }
}
