"use client";

import {
  Calendar,
  Check,
  MapPin,
  Package,
  Phone,
  Truck,
  User,
  Wrench,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import toast from "react-hot-toast";
import {
  getStoredRequests,
  subscribeToRequests,
  approveExtraWorkRequest,
  declineExtraWorkRequest,
  ServiceRequestItem,
  ExtraWorkRequest,
} from "@/types/serviceRequestStore";

function TrackContent() {
  const searchParams = useSearchParams();
  const reqId = searchParams.get("id") || "SR-1024";

  const [requests, setRequests] = useState<ServiceRequestItem[]>([]);

  useEffect(() => {
    setRequests(getStoredRequests());
    const unsubscribe = subscribeToRequests((updated) => {
      setRequests(updated);
    });
    return () => unsubscribe();
  }, []);

  const currentJob = requests.find((r) => r.id === reqId) || requests[0] || {
    id: reqId,
    date: "Jun 24, 2026",
    propertyManager: "Alex Johnson",
    property: "Sunset Apartments",
    address: "123 Sunset Blvd, Los Angeles, CA 90028",
    issue: "Plumbing Leak in Unit 4B",
    type: "Plumbing",
    contractor: "John Smith Plumbing",
    contractorPhone: "+1 (555) 310-4422",
    priority: "High",
    status: "In Progress",
    basePay: 250,
    notes: "Tenant reports water leak under sink.",
    etaDate: "Jun 27, 2026",
    extraWorkRequests: [],
  };

  const handleApproveExtraWork = (extraWorkId: string) => {
    approveExtraWorkRequest(currentJob.id, extraWorkId);
    toast.success(`Extra Work Request ${extraWorkId} approved by Property Manager!`);
  };

  const handleDeclineExtraWork = (extraWorkId: string) => {
    declineExtraWorkRequest(currentJob.id, extraWorkId, "Declined by Property Manager");
    toast.error(`Extra Work Request ${extraWorkId} declined.`);
  };

  const extraWorks: ExtraWorkRequest[] = currentJob.extraWorkRequests || [];

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight">
            Project Progress: Job #{currentJob.id}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1">
            Real-time milestone tracking for {currentJob.issue} at {currentJob.property}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 bg-[#F2E7FC] text-[#6B1294] font-bold text-xs rounded-full border border-purple-200">
            Status: {currentJob.status}
          </span>
        </div>
      </div>

      {/* Top Info Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Info Card (7 Cols) */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#F2E7FC] text-[#6B1294] font-bold text-xs px-3 py-1 rounded-full">
              {currentJob.id}
            </span>

            <span
              className={`font-semibold text-xs px-3 py-1 rounded-full ${currentJob.priority === "Critical" || (currentJob.priority as string) === "Urgent"
                  ? "bg-[#FEE2E2] text-[#EF4444]"
                  : currentJob.priority === "High"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-blue-100 text-blue-700"
                }`}
            >
              {currentJob.priority} Priority
            </span>

            <span className="bg-[#F3E8FF] text-[#7C3AED] font-semibold text-xs px-3 py-1 rounded-full">
              {currentJob.status}
            </span>

            <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1 rounded-full border border-emerald-200">
              Base Price: ${currentJob.basePay}
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            {currentJob.issue}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-normal">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>{currentJob.property} · {currentJob.address}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>Created {currentJob.date}</span>
            </span>
          </div>
        </div>

        {/* Right Contractor Card (5 Cols) */}
        <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-6 shadow-xs flex flex-col justify-between">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Assigned Service Provider</h3>
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center font-bold shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">
                {currentJob.contractor}
              </h4>
              <p className="text-xs text-gray-500 font-normal flex items-center gap-1.5 mt-1">
                <Phone className="w-3 h-3 text-gray-400" />
                <span>{currentJob.contractorPhone || "+1 (555) 310-4422"}</span>
              </p>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-500 border-t border-gray-100 pt-2">
            Property Manager: <span className="font-semibold text-gray-800">{currentJob.propertyManager}</span>
          </div>
        </div>
      </div>

      {/* Project Progress Stepper Timeline Card */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h3 className="text-base sm:text-lg font-medium">
            Real–time milestone tracking for this work order.
          </h3>
          <div className="bg-[#F4EFFC] border border-[#E1D4F4] px-3.5 py-1.5 rounded-full flex items-center gap-3 shrink-0 self-start sm:self-auto">
            <div className="w-24 sm:w-28 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#6B1294] h-full rounded-full transition-all duration-300"
                style={{
                  width:
                    currentJob.status === "Completed"
                      ? "100%"
                      : currentJob.status === "In Progress" || currentJob.status === "Accepted"
                        ? "70%"
                        : currentJob.status === "Assigned"
                          ? "40%"
                          : "20%",
                }}
              />
            </div>
            <span className="text-xs font-bold text-[#6B1294]">
              {currentJob.status === "Completed"
                ? "100% Complete"
                : currentJob.status === "In Progress" || currentJob.status === "Accepted"
                  ? "70% Complete"
                  : currentJob.status === "Assigned"
                    ? "40% Complete"
                    : "20% Pending"}
            </span>
          </div>
        </div>

        {/* 5-Step Horizontal Stepper Timeline */}
        <div className="relative flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-0 px-2 sm:px-4">
          <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-[3px] bg-gray-200 -z-0">
            <div
              className="h-full bg-[#6B1294] transition-all duration-300"
              style={{
                width:
                  currentJob.status === "Completed"
                    ? "100%"
                    : currentJob.status === "In Progress" || currentJob.status === "Accepted"
                      ? "60%"
                      : currentJob.status === "Assigned"
                        ? "30%"
                        : "0%",
              }}
            />
          </div>

          {/* Step 1: Received */}
          <div className="flex flex-col items-center text-center z-10 flex-1">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-xs">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
            </div>
            <h4 className="font-bold text-sm text-gray-900 mt-3">Received</h4>
            <p className="text-xs text-gray-400 font-normal mt-0.5">{currentJob.date}</p>
          </div>

          {/* Step 2: Assigned */}
          <div className="flex flex-col items-center text-center z-10 flex-1">
            <div className="relative">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xs ${currentJob.status !== "Pending" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"
                  }`}
              >
                <Truck className="w-5 h-5" />
              </div>
              {currentJob.status !== "Pending" && (
                <div className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}
            </div>
            <h4 className="font-bold text-sm text-gray-900 mt-3">Assigned</h4>
            <p className="text-xs text-gray-400 font-normal mt-0.5">{currentJob.contractor}</p>
          </div>

          {/* Step 3: Accepted / In Progress */}
          <div className="flex flex-col items-center text-center z-10 flex-1">
            <div className="w-16 h-16 rounded-full bg-[#E9D5FF]/70 flex items-center justify-center -my-2">
              <div className="w-12 h-12 rounded-full bg-[#6B1294] text-white flex items-center justify-center shadow-md">
                <Wrench className="w-5 h-5 text-white" />
              </div>
            </div>
            <h4 className="font-bold text-sm text-[#6B1294] mt-3">Accepted / On-Site</h4>
            <p className="text-xs text-gray-400 font-normal mt-0.5">Work in progress</p>
            <span className="inline-block mt-1.5 bg-[#F0E6FC] text-[#6B1294] font-medium text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              CURRENT
            </span>
          </div>

          {/* Step 4: Review */}
          <div className="flex flex-col items-center text-center z-10 flex-1">
            <div className="w-12 h-12 rounded-full border-2 border-gray-300 bg-gray-50/80 text-gray-400 flex items-center justify-center">
              <Check className="w-5 h-5 text-gray-400 stroke-[2]" />
            </div>
            <h4 className="font-medium text-sm text-gray-400 mt-3">Review</h4>
            <p className="text-xs text-gray-400 font-normal mt-0.5 max-w-[130px]">
              Awaiting PM Review
            </p>
          </div>

          {/* Step 5: Completed */}
          <div className="flex flex-col items-center text-center z-10 flex-1">
            <div className="w-12 h-12 rounded-full border-2 border-gray-300 bg-gray-50/80 text-gray-400 flex items-center justify-center">
              <Check className="w-5 h-5 text-gray-400 stroke-[2]" />
            </div>
            <h4 className="font-medium text-sm text-gray-400 mt-3">Completed</h4>
            <p className="text-xs text-gray-400 font-normal mt-0.5">
              Finished & Approved
            </p>
          </div>
        </div>
      </div>

      {/* EXTRA WORK REQUESTS SECTION FOR PROPERTY MANAGER */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#6B1294]" />
              <span>Extra Work Requests</span>
            </h3>
            <p className="text-xs text-gray-500 font-normal mt-0.5">
              Review and approve additional work requests submitted on-site by the Service Provider.
            </p>
          </div>
          <span className="px-3 py-1 bg-purple-100 text-[#6B1294] rounded-full text-xs font-bold">
            {extraWorks.length} Request{extraWorks.length === 1 ? "" : "s"}
          </span>
        </div>

        {extraWorks.length === 0 ? (
          <div className="py-8 text-center bg-gray-50/60 rounded-lg border border-dashed border-gray-200">
            <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-xs font-semibold text-gray-700">No Extra Work Requests Submitted</p>
            <p className="text-[11px] text-gray-400 mt-1 max-w-md mx-auto">
              If the Service Provider discovers additional scope requirements on-site, their submitted Extra Work Request will appear here for your approval.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {extraWorks.map((ew) => (
              <div
                key={ew.id}
                className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-purple-50/20 hover:bg-purple-50/40 transition-colors space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 bg-[#6B1294] text-white rounded-md font-bold text-xs">
                      {ew.id}
                    </span>
                    <h4 className="text-base font-bold text-gray-900">{ew.extraServiceName}</h4>
                  </div>

                  {/* Approval Status Badge */}
                  <div>
                    {ew.approvalStatus === "Approved" ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Approved by PM
                      </span>
                    ) : ew.approvalStatus === "Declined" ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300 inline-flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5 text-red-600" />
                        Declined
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 inline-flex items-center gap-1 animate-pulse">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        Pending Approval
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="md:col-span-2 space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Work Description</span>
                    <p className="text-gray-800 font-normal leading-relaxed">{ew.description}</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-1">
                    <div className="flex justify-between items-center text-gray-600">
                      <span>Requested By:</span>
                      <span className="font-bold text-gray-900">{ew.requestedBy}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                      <span>Requested Date:</span>
                      <span className="font-semibold">{ew.requestedDate}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-900 border-t border-gray-100 pt-1.5">
                      <span className="font-bold">Additional Fee:</span>
                      <span className="font-medium text-[#6B1294] text-sm">${ew.additionalFee}</span>
                    </div>
                  </div>
                </div>

                {/* Images */}
                {ew.images && ew.images.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                      Attached Photos ({ew.images.length})
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {ew.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Extra work photo ${idx + 1}`}
                          className="w-24 h-16 object-cover rounded-lg border border-gray-200 shadow-2xs"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Work Status Info (Approved vs Started) */}
                {ew.approvalStatus === "Approved" && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 flex items-center justify-between text-xs text-emerald-800">
                    <span>
                      <strong>PM Approval Record:</strong> Approved on {ew.approvedDate || "Today"}.
                    </span>
                    <span className="font-bold bg-emerald-200/80 px-2.5 py-0.5 rounded-md text-[11px]">
                      Work Status: {ew.workStatus || "Approved (Ready to Start)"}
                    </span>
                  </div>
                )}

                {/* Property Manager Action Buttons */}
                {ew.approvalStatus === "Pending Approval" && (
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => handleApproveExtraWork(ew.id)}
                      className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-2xs text-center flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve Extra Work (${ew.additionalFee})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeclineExtraWork(ew.id)}
                      className="flex-1 py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg text-xs transition-colors cursor-pointer border border-red-200 text-center flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Decline Extra Work</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-500">Loading tracking page...</div>}>
      <TrackContent />
    </Suspense>
  );
}
