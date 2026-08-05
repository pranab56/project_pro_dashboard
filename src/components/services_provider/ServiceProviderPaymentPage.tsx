"use client";

import React, { useState } from "react";
import {
  DollarSign,
  Clock,
  TrendingUp,
  Plus,
  Landmark,
  CheckCircle2,
  Download,
  X,
  Building,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentHistoryItem {
  paymentId: string;
  jobId: string;
  propertyName: string;
  paymentDate: string;
  amount: string;
  status: "Paid" | "Unpaid" | "Processing";
}

export default function ServiceProviderPaymentPage(): React.ReactElement {
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);

  const [bankAccounts, setBankAccounts] = useState([
    {
      id: "1",
      bankName: "Chase Bank",
      accountType: "Checking",
      last4: "4892",
      routingLast4: "0142",
      isPrimary: true,
    },
  ]);

  const [newBankName, setNewBankName] = useState("");
  const [newAccountType, setNewAccountType] = useState("Checking");
  const [newAccountNumber, setNewAccountNumber] = useState("");
  const [newRoutingNumber, setNewRoutingNumber] = useState("");
  const [modalErrors, setModalErrors] = useState<Record<string, string>>({});

  const paymentHistory: PaymentHistoryItem[] = [
    {
      paymentId: "PAY-001",
      jobId: "JOB-003",
      propertyName: "Oakwood Villas",
      paymentDate: "Jun 24, 2026",
      amount: "$340",
      status: "Paid",
    },
    {
      paymentId: "PAY-002",
      jobId: "JOB-007",
      propertyName: "Elmwood Estates",
      paymentDate: "Jun 25, 2026",
      amount: "$480",
      status: "Paid",
    },
    {
      paymentId: "PAY-003",
      jobId: "JOB-001",
      propertyName: "Maple Heights Apt",
      paymentDate: "Jun 26, 2026",
      amount: "$270",
      status: "Unpaid",
    },
    {
      paymentId: "PAY-004",
      jobId: "JOB-006",
      propertyName: "Harbor View Lofts",
      paymentDate: "Jun 26, 2026",
      amount: "$960",
      status: "Processing",
    },
    {
      paymentId: "PAY-005",
      jobId: "JOB-002",
      propertyName: "Riverside Condos",
      paymentDate: "Jun 23, 2026",
      amount: "$180",
      status: "Paid",
    },
  ];

  const handleExport = () => {
    toast.success("Downloading payment history export CSV...");
  };

  const handleAddAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!newBankName.trim()) errs.bankName = "Bank Name is required";
    if (!newAccountNumber.trim()) errs.accountNumber = "Account Number is required";
    if (!newRoutingNumber.trim()) errs.routingNumber = "Routing Number is required";

    if (Object.keys(errs).length > 0) {
      setModalErrors(errs);
      return;
    }

    const last4 = newAccountNumber.slice(-4) || "1234";
    const routingLast4 = newRoutingNumber.slice(-4) || "5678";

    setBankAccounts((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        bankName: newBankName,
        accountType: newAccountType,
        last4,
        routingLast4,
        isPrimary: false,
      },
    ]);

    toast.success("Bank account added successfully!");
    setNewBankName("");
    setNewAccountNumber("");
    setNewRoutingNumber("");
    setModalErrors({});
    setIsAddAccountModalOpen(false);
  };

  const getStatusBadge = (status: PaymentHistoryItem["status"]) => {
    switch (status) {
      case "Paid":
        return (
          <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700 inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Paid
          </span>
        );
      case "Unpaid":
        return (
          <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700 inline-block">
            Unpaid
          </span>
        );
      case "Processing":
        return (
          <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 inline-block">
            Processing
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Payment Information
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1">
          Track your earnings, monitor your pending payouts, and see exactly when your money will arrive.
        </p>
      </div>

      {/* Top 3 Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Total Earnings */}
        <div className="bg-[#16A34A] rounded-2xl p-6 text-white shadow-sm flex flex-col justify-between min-h-[140px] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base font-semibold text-white/95">
              Total Earnings
            </span>
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
              <DollarSign className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              $1,000
            </div>
            <p className="text-xs text-white/80 font-normal mt-2">
              YTD (Year-to-Date)
            </p>
          </div>
        </div>

        {/* Card 2: Unpaid Payouts */}
        <div className="bg-yellow-500 rounded-2xl p-6 text-white shadow-sm flex flex-col justify-between min-h-[140px] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base font-semibold text-white/95">
              Unpaid Payouts
            </span>
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
              <Clock className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              $1,230
            </div>
            <p className="text-xs text-white/80 font-normal mt-2">
              En route to Account
            </p>
          </div>
        </div>

        {/* Card 3: Open Invoices */}
        <div className="bg-[#7C3AED] rounded-2xl p-6 text-white shadow-sm flex flex-col justify-between min-h-[140px] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base font-semibold text-white/95">
              Open Invoices
            </span>
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
              <TrendingUp className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              $230
            </div>
            <p className="text-xs text-white/80 font-normal mt-2">
              Awaiting Approval
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods Section Container */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
            Payment Methods
          </h2>
          <button
            type="button"
            onClick={() => setIsAddAccountModalOpen(true)}
            className="bg-[#5B1B95] hover:bg-[#4C127D] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add account</span>
          </button>
        </div>

        {/* Tab / Category Pill */}
        <div className="bg-[#F2E7FC] border border-[#6B1294]/30 text-[#6B1294] py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm w-full text-center">
          <Landmark className="w-4 h-4" />
          <span>Bank Account</span>
        </div>

        {/* Bank Accounts List */}
        <div className="space-y-3">
          {bankAccounts.map((acc) => (
            <div
              key={acc.id}
              className="bg-white border border-[#6B1294]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition-all"
            >
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-900">
                  {acc.bankName} — {acc.accountType}
                </h3>
                <p className="text-xs text-gray-500 font-mono tracking-widest">
                  •••• •••• {acc.last4}
                </p>
                <p className="text-xs text-gray-400 font-normal">
                  Routing: •••••{acc.routingLast4}
                </p>
              </div>

              {acc.isPrimary && (
                <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 w-fit">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Primary
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Payment History Section Container */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
            Payment History
          </h2>
          <button
            type="button"
            onClick={handleExport}
            className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Export</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-300/60 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Payment ID</th>
                <th className="py-3.5 px-4">Job ID</th>
                <th className="py-3.5 px-4">Property Name</th>
                <th className="py-3.5 px-4">Payment Date</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300/40 text-xs sm:text-sm">
              {paymentHistory.map((row) => (
                <tr
                  key={row.paymentId}
                  className="hover:bg-gray-100/60 transition-colors"
                >
                  <td className="py-4 px-4 font-bold text-[#6B1294]">
                    {row.paymentId}
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-700">
                    {row.jobId}
                  </td>
                  <td className="py-4 px-4 font-normal text-gray-600">
                    {row.propertyName}
                  </td>
                  <td className="py-4 px-4 font-normal text-gray-500">
                    {row.paymentDate}
                  </td>
                  <td className="py-4 px-4 font-bold text-gray-900">
                    {row.amount}
                  </td>
                  <td className="py-4 px-4">{getStatusBadge(row.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Bank Account Modal */}
      {isAddAccountModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#E5E7EB] relative space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-[#6B1294]" />
                <span>Add Bank Account</span>
              </h2>
              <button
                type="button"
                onClick={() => setIsAddAccountModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-200 cursor-pointer p-1.5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAccountSubmit} className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Bank Name *
                </label>
                <input
                  type="text"
                  value={newBankName}
                  onChange={(e) => {
                    setNewBankName(e.target.value);
                    if (e.target.value) setModalErrors((p) => ({ ...p, bankName: "" }));
                  }}
                  placeholder="e.g. Chase Bank, Bank of America"
                  className={`w-full h-[46px] px-4 py-3 bg-white border rounded-xl text-sm text-gray-900 focus:outline-none transition-all ${modalErrors.bankName
                      ? "border-red-500 bg-red-50/20"
                      : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
                    }`}
                />
                {modalErrors.bankName && (
                  <p className="text-red-500 text-xs mt-1 font-semibold">
                    ⚠️ {modalErrors.bankName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Account Type *
                </label>
                <Select
                  value={newAccountType}
                  onValueChange={(val) => setNewAccountType(val)}
                >
                  <SelectTrigger className="w-full h-[46px] px-4 py-3 bg-white border border-gray-300 py-5.5 rounded-xl text-sm text-gray-900 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20 focus:outline-none transition-all cursor-pointer shadow-none">
                    <SelectValue placeholder="Select Account Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-xl border border-gray-200 shadow-lg z-[70]">
                    <SelectItem value="Checking">Checking</SelectItem>
                    <SelectItem value="Savings">Savings</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Account Number *
                </label>
                <input
                  type="text"
                  value={newAccountNumber}
                  onChange={(e) => {
                    setNewAccountNumber(e.target.value);
                    if (e.target.value) setModalErrors((p) => ({ ...p, accountNumber: "" }));
                  }}
                  placeholder="••••••••4892"
                  className={`w-full h-[46px] px-4 py-3 bg-white border rounded-xl text-sm text-gray-900 focus:outline-none transition-all ${modalErrors.accountNumber
                      ? "border-red-500 bg-red-50/20"
                      : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
                    }`}
                />
                {modalErrors.accountNumber && (
                  <p className="text-red-500 text-xs mt-1 font-semibold">
                    ⚠️ {modalErrors.accountNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Routing Number *
                </label>
                <input
                  type="text"
                  value={newRoutingNumber}
                  onChange={(e) => {
                    setNewRoutingNumber(e.target.value);
                    if (e.target.value) setModalErrors((p) => ({ ...p, routingNumber: "" }));
                  }}
                  placeholder="••••••0142"
                  className={`w-full h-[46px] px-4 py-3 bg-white border rounded-xl text-sm text-gray-900 focus:outline-none transition-all ${modalErrors.routingNumber
                      ? "border-red-500 bg-red-50/20"
                      : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
                    }`}
                />
                {modalErrors.routingNumber && (
                  <p className="text-red-500 text-xs mt-1 font-semibold">
                    ⚠️ {modalErrors.routingNumber}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddAccountModalOpen(false)}
                  className="flex-1 py-3 px-4 bg-white hover:bg-gray-100 border border-gray-300 rounded-xl text-gray-800 font-semibold text-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold rounded-xl shadow-xs text-sm transition-colors cursor-pointer"
                >
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
