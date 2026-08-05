"use client";

import {
  Calendar,
  Check,
  ChevronLeft,
  MapPin,
  Package,
  Phone,
  Truck,
  User,
  Wrench,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, Suspense } from "react";
import toast from "react-hot-toast";

type PriorityType = "Urgent" | "High" | "Medium" | "Low";
type StatusType = "In Progress" | "Assigned" | "Completed" | "Pending" | "Cancelled";

interface ServiceRequest {
  id: string;
  title: string;
  property: string;
  address: string;
  priority: PriorityType;
  status: StatusType;
  stage: number;
  stageText: string;
  contractor: string;
  contractorPhone?: string;
  createdDate: string;
  isOccupied?: boolean;
  tenantName?: string;
  tenantPhone?: string;
}

const mockRequests: Record<string, ServiceRequest> = {
  "SR-001": {
    id: "SR-001",
    title: "Plumbing Leak in Unit 4B",
    property: "Sunset Apartments",
    address: "123 Sunset Blvd, Los Angeles, CA 90028",
    priority: "Urgent",
    status: "In Progress",
    stage: 3,
    stageText: "Stage 3: In Progress",
    contractor: "John Smith Plumbing",
    contractorPhone: "+1 (555) 310-4422",
    createdDate: "Jun 22, 2026",
    isOccupied: true,
    tenantName: "Nichole",
    tenantPhone: "+555 2552 552",
  },
  "SR-002": {
    id: "SR-002",
    title: "HVAC Not Cooling — 3rd Floor",
    property: "Green Valley Complex",
    address: "456 Valley Rd, Phoenix, AZ 85001",
    priority: "High",
    status: "Assigned",
    stage: 2,
    stageText: "Stage 2: Supplies",
    contractor: "CoolAir Services",
    contractorPhone: "+1 (555) 482-9901",
    createdDate: "Jun 21, 2026",
  },
  "SR-003": {
    id: "SR-003",
    title: "Electrical Panel Inspection",
    property: "TechHub Tower",
    address: "789 Innovation Dr, San Francisco, CA 94105",
    priority: "High",
    status: "Assigned",
    stage: 2,
    stageText: "Stage 2: Supplies",
    contractor: "PowerTech Electric",
    contractorPhone: "+1 (555) 619-3388",
    createdDate: "Jun 20, 2026",
  },
  "SR-004": {
    id: "SR-004",
    title: "Landscaping & Lawn Care",
    property: "Maple Street Condos",
    address: "321 Maple St, Chicago, IL 60601",
    priority: "Low",
    status: "Completed",
    stage: 4,
    stageText: "Completed",
    contractor: "GreenThumb Landscaping",
    contractorPhone: "+1 (555) 204-1144",
    createdDate: "Jun 18, 2026",
  },
  "SR-005": {
    id: "SR-005",
    title: "Elevator #2 Maintenance",
    property: "Harbor View Plaza",
    address: "555 Harbor Blvd, Seattle, WA 98101",
    priority: "Urgent",
    status: "In Progress",
    stage: 4,
    stageText: "Stage 4: Done",
    contractor: "Otis Elevator Services",
    contractorPhone: "+1 (555) 777-9090",
    createdDate: "Jun 17, 2026",
  },
};

function TrackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reqId = searchParams.get("id") || "SR-001";

  const initialData = mockRequests[reqId] || mockRequests["SR-001"];
  const [request, setRequest] = useState<ServiceRequest>(initialData);

  const handleComplete = () => {
    setRequest({
      ...request,
      status: "Completed",
      stage: 4,
      stageText: "Completed",
    });
    toast.success(`Request ${request.id} marked as Completed`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Row with Title & Approved Status Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight">
            Project Progress: Job #{request.id}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1">
            Real-time milestone tracking for {request.title} at {request.property}.
          </p>
        </div>

        <button
          type="button"
          onClick={handleComplete}
          className="px-6 py-2.5 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-lg text-sm transition-colors cursor-pointer shadow-xs self-start sm:self-auto"
        >
          Approved
        </button>
      </div>

      {/* Top Info Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Info Card (7 Cols) */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-[#F2E7FC] text-[#6B1294] font-bold text-xs px-3 py-1 rounded-full">
              {request.id}
            </span>
            <span
              className={`font-semibold text-xs px-3 py-1 rounded-full ${request.priority === "Urgent"
                ? "bg-[#FEE2E2] text-[#EF4444]"
                : request.priority === "High"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-blue-100 text-blue-700"
                }`}
            >
              {request.priority} Priority
            </span>
            <span className="bg-[#F3E8FF] text-[#7C3AED] font-semibold text-xs px-3 py-1 rounded-full">
              {request.status}
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            {request.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-normal">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>{request.property} · {request.address}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>Received {request.createdDate}</span>
            </span>
          </div>
        </div>

        {/* Right Contractor Card (5 Cols) */}
        <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Assigned To</h3>
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center font-bold shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">
                {request.contractor}
              </h4>
              <p className="text-xs text-gray-500 font-normal flex items-center gap-1.5 mt-1">
                <Phone className="w-3 h-3 text-gray-400" />
                <span>{request.contractorPhone || "+1 (555) 000-0000"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Progress Stepper Timeline Card */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Header Title & Progress Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <h3 className="text-base sm:text-lg font-medium">
            Real–time milestone tracking for this work order.
          </h3>
          <div className="bg-[#F4EFFC] border border-[#E1D4F4] px-3.5 py-1.5 rounded-full flex items-center gap-3 shrink-0 self-start sm:self-auto">
            <div className="w-24 sm:w-28 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="bg-[#6B1294] h-full rounded-full w-[70%]" />
            </div>
            <span className="text-xs font-bold text-[#6B1294]">
              70% Complete
            </span>
          </div>
        </div>

        {/* 5-Step Horizontal Stepper Timeline */}
        <div className="relative flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-0 px-2 sm:px-4">
          {/* Background Connecting Line */}
          <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-[3px] bg-gray-200 -z-0">
            <div className="h-full bg-[#6B1294] w-[50%]" />
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
            <p className="text-xs text-gray-400 font-normal mt-0.5">{request.createdDate}</p>
          </div>

          {/* Step 2: Assigned */}
          <div className="flex flex-col items-center text-center z-10 flex-1">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-xs">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
            </div>
            <h4 className="font-bold text-sm text-gray-900 mt-3">Assigned</h4>
            <p className="text-xs text-gray-400 font-normal mt-0.5">Work order accpted</p>
          </div>

          {/* Step 3: On-Site (CURRENT) */}
          <div className="flex flex-col items-center text-center z-10 flex-1">
            <div className="w-16 h-16 rounded-full bg-[#E9D5FF]/70 flex items-center justify-center -my-2">
              <div className="w-12 h-12 rounded-full bg-[#6B1294] text-white flex items-center justify-center shadow-md">
                <Wrench className="w-5 h-5 text-white" />
              </div>
            </div>
            <h4 className="font-bold text-sm text-[#6B1294] mt-3">On-Site</h4>
            <p className="text-xs text-gray-400 font-normal mt-0.5">Work in progress</p>
            <span className="inline-block mt-1.5 bg-[#F0E6FC] text-[#6B1294] font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
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
              Awaiting Manager Approval
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
