"use client";

import {
  Calendar,
  CheckCircle2,
  ChevronLeft,
  MapPin,
  PackageCheck,
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
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/service-requests")}
            className="px-3.5 py-2 bg-[#F9FAFB] border border-gray-300 hover:bg-gray-100 rounded-xl text-gray-700 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Service Requests</span>
          </button>
          <span className="font-bold text-[#8E25E3] text-sm sm:text-base">
            {request.id}
          </span>
        </div>

        <button
          type="button"
          onClick={handleComplete}
          className="px-5 py-2.5 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 text-emerald-800 font-semibold rounded-xl text-sm transition-colors cursor-pointer"
        >
          Complete
        </button>
      </div>

      {/* Top Info Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Info Card (2 Cols) */}
        <div className="lg:col-span-2 bg-[#F9FAFB] border border-gray-300/50 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-[#F2E7FC] text-[#8E25E3] font-bold text-xs px-2.5 py-1 rounded-lg">
              {request.id}
            </span>
            <span
              className={`font-semibold text-xs px-2.5 py-1 rounded-full ${request.priority === "Urgent"
                  ? "bg-red-100 text-red-600"
                  : request.priority === "High"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-blue-100 text-blue-700"
                }`}
            >
              {request.priority} Priority
            </span>
            <span className="bg-purple-100 text-purple-700 font-semibold text-xs px-2.5 py-1 rounded-full">
              {request.status}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            {request.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-normal">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              {request.property} · {request.address}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              Created {request.createdDate}
            </span>
          </div>
        </div>

        {/* Right Contractor Card (1 Col) */}
        <div className="bg-[#F9FAFB] border border-gray-300/50 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Contractor</h3>
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">
                {request.contractor}
              </h4>
              <p className="text-xs text-gray-500 font-normal mt-0.5">
                {request.contractorPhone || "+1 (555) 000-0000"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Progress Stepper Timeline Card */}
      <div className="bg-[#F9FAFB] border border-gray-300/50 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-gray-900">Project Progress</h3>
          <div className="bg-[#DEDEE1] px-4 py-1.5 rounded-full flex items-center gap-2">
            <div className="w-24 bg-gray-300 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#8E25E3] h-full rounded-full transition-all duration-500"
                style={{
                  width: `${request.stage === 1
                      ? "25%"
                      : request.stage === 2
                        ? "50%"
                        : request.stage === 3
                          ? "70%"
                          : "100%"
                    }`,
                }}
              />
            </div>
            <span className="text-xs font-bold text-[#8E25E3]">
              {request.stage === 1
                ? "25%"
                : request.stage === 2
                  ? "50%"
                  : request.stage === 3
                    ? "70%"
                    : "100%"}{" "}
              Complete
            </span>
          </div>
        </div>

        {/* 4 Step Horizontal Timeline */}
        <div className="relative flex flex-col md:flex-row items-start justify-between gap-8 md:gap-0 px-4">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-6 left-12 right-12 h-1 bg-gray-300 -z-0">
            <div
              className="h-full bg-[#8E25E3] transition-all duration-500"
              style={{
                width: `${request.stage === 1
                    ? "0%"
                    : request.stage === 2
                      ? "33%"
                      : request.stage === 3
                        ? "66%"
                        : "100%"
                  }`,
              }}
            />
          </div>

          {/* Step 1: Project Started */}
          <div className="flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-2 z-10 text-center flex-1">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900 mt-2">Project Started</h4>
              <p className="text-xs text-gray-500 mt-0.5">{request.createdDate}</p>
            </div>
          </div>

          {/* Step 2: Awaiting Supplies */}
          <div className="flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-2 z-10 text-center flex-1">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-colors ${request.stage >= 2
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-400 border border-gray-300"
                }`}
            >
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900 mt-2">Awaiting Supplies</h4>
              <p className="text-xs text-gray-500 mt-0.5">{request.createdDate}</p>
            </div>
          </div>

          {/* Step 3: In Progress */}
          <div className="flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-2 z-10 text-center flex-1">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-colors ${request.stage >= 3
                  ? "bg-[#8E25E3] text-white ring-4 ring-purple-200"
                  : "bg-gray-200 text-gray-400 border border-gray-300"
                }`}
            >
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#8E25E3] mt-2">In Progress</h4>
              <p className="text-xs text-gray-500 mt-0.5">Active work underway on site</p>
              {request.stage === 3 && (
                <span className="inline-block mt-1 bg-purple-100 text-[#8E25E3] font-extrabold text-[10px] px-2 py-0.5 rounded-md">
                  CURRENT
                </span>
              )}
            </div>
          </div>

          {/* Step 4: Completed */}
          <div className="flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-2 z-10 text-center flex-1">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-colors ${request.stage === 4
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-400 border border-gray-300"
                }`}
            >
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900 mt-2">Completed</h4>
              <p className="text-xs text-gray-500 mt-0.5">Job finished and verified</p>
            </div>
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
