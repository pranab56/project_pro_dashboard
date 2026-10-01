"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  Clock,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  MapPin,
  MoreHorizontal,
  Info,
  MessageSquare,
  ArrowLeftRight,
  X,
  Send,
  Check,
  Search,
  FileText,
  Shield,
} from "lucide-react";
import toast from "react-hot-toast";

export interface OverviewJobItem {
  id: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  title: string;
  category: string;
  status: "In Progress" | "Pending" | "Completed" | "Cancelled";
  statusStyle: string;
  priorityColor: string;
  payout: string;
  clientName: string;
  postedBy: string;
  unit: string;
  scheduledDate: string;
  scheduledTime?: string;
  address: string;
  scopeDescription: string;
  notes: string;
  images: string[];
  progressPercent: number;
  tabCategory: "assigned" | "upcoming" | "completed";
}

const initialJobRequests: OverviewJobItem[] = [
  {
    id: "JOB-001",
    priority: "HIGH",
    title: "Maple Heights Apt",
    category: "Plumbing Repair",
    status: "In Progress",
    statusStyle: "bg-blue-100 text-blue-800 border border-blue-200/80",
    priorityColor: "text-[#E53935]",
    payout: "$350",
    clientName: "Sarah Johnson",
    postedBy: "Sarah Johnson (Property Manager)",
    unit: "Unit 204",
    scheduledDate: "June 26, 2026",
    scheduledTime: "8:00 AM",
    address: "410 Maple St, Austin, TX 78703",
    scopeDescription: "Kitchen sink pipe leakage fix and new faucet installation.",
    notes: "Tenant will be at home during repair. Gate code #4412.",
    images: ["/images/prop_5.png"],
    progressPercent: 40,
    tabCategory: "assigned",
  },
  {
    id: "JOB-002",
    priority: "MEDIUM",
    title: "Riverside Condos",
    category: "Electrical Inspection",
    status: "Pending",
    statusStyle: "bg-amber-100 text-amber-800 border border-amber-200/80",
    priorityColor: "text-[#D97706]",
    payout: "$220",
    clientName: "Marcus Chen",
    postedBy: "Marcus Chen (Property Owner)",
    unit: "Condo 501",
    scheduledDate: "July 27, 2026",
    scheduledTime: "10:30 AM",
    address: "120 Riverside Dr, Austin, TX 78702",
    scopeDescription: "Circuit breaker tripping investigation and outlet replacement.",
    notes: "Main breaker panel is located in the basement.",
    images: ["/images/prop_3.png"],
    progressPercent: 0,
    tabCategory: "upcoming",
  },
  {
    id: "JOB-003",
    priority: "HIGH",
    title: "Pine Ridge Complex",
    category: "HVAC Maintenance",
    status: "In Progress",
    statusStyle: "bg-blue-100 text-blue-800 border border-blue-200/80",
    priorityColor: "text-[#E53935]",
    payout: "$410",
    clientName: "Robert Davis",
    postedBy: "Robert Davis (Property Manager)",
    unit: "Bldg C, Unit 102",
    scheduledDate: "June 26, 2026",
    scheduledTime: "11:30 AM",
    address: "550 Pine Ridge Blvd, Austin, TX 78745",
    scopeDescription: "Central AC unit filter replacement and coolant leak check.",
    notes: "Access key code is in lockbox by back entryway.",
    images: ["/images/prop_1.png"],
    progressPercent: 25,
    tabCategory: "assigned",
  },
  {
    id: "JOB-004",
    priority: "HIGH",
    title: "Sunset Gardens",
    category: "Roof Inspection",
    status: "Pending",
    statusStyle: "bg-amber-100 text-amber-800 border border-amber-200/80",
    priorityColor: "text-[#E53935]",
    payout: "$280",
    clientName: "David Park",
    postedBy: "Alex (Property Manager)",
    unit: "Building B Roof",
    scheduledDate: "July 26, 2026",
    scheduledTime: "8:30 AM",
    address: "320 Sunset Loop, Austin, TX 78745",
    scopeDescription: "Full roof tile leak assessment following heavy storm.",
    notes: "Ladder access located at North wing entrance.",
    images: ["/images/prop_1.png"],
    progressPercent: 0,
    tabCategory: "upcoming",
  },
  {
    id: "JOB-005",
    priority: "LOW",
    title: "Oak Ridge Apartments",
    category: "Carpentry & Door Lock Repair",
    status: "Completed",
    statusStyle: "bg-emerald-100 text-emerald-800 border border-emerald-200/80",
    priorityColor: "text-gray-600",
    payout: "$190",
    clientName: "Elena Rostova",
    postedBy: "Elena (Building Admin)",
    unit: "Unit 308",
    scheduledDate: "June 20, 2026",
    scheduledTime: "1:00 PM",
    address: "880 Oak Ridge Way, Austin, TX 78704",
    scopeDescription: "Front entrance deadbolt lock adjustment and frame alignment.",
    notes: "Completed successfully. Receipt uploaded.",
    images: [],
    progressPercent: 100,
    tabCategory: "completed",
  },
  {
    id: "JOB-006",
    priority: "HIGH",
    title: "Harbor View Lofts",
    category: "Flooring Installation",
    status: "In Progress",
    statusStyle: "bg-blue-100 text-blue-800 border border-blue-200/80",
    priorityColor: "text-[#E53935]",
    payout: "$450",
    clientName: "James Wilson",
    postedBy: "Sarah (Operations Lead)",
    unit: "Unit 12A",
    scheduledDate: "June 26, 2026",
    scheduledTime: "2:00 PM",
    address: "742 Harbor View Ave, Austin, TX 78701",
    scopeDescription: "Hardwood flooring installation in main hallway and living area.",
    notes: "Elevator access key available at front desk.",
    images: ["/images/prop_2.png", "/images/prop_4.png"],
    progressPercent: 65,
    tabCategory: "assigned",
  },
  {
    id: "JOB-007",
    priority: "MEDIUM",
    title: "Highland Park Villas",
    category: "Drywall & Painting Touchup",
    status: "Completed",
    statusStyle: "bg-emerald-100 text-emerald-800 border border-emerald-200/80",
    priorityColor: "text-[#D97706]",
    payout: "$310",
    clientName: "Karen Miller",
    postedBy: "Karen Miller (Property Manager)",
    unit: "Villa 14",
    scheduledDate: "June 18, 2026",
    scheduledTime: "10:00 AM",
    address: "1050 Highland Pkwy, Austin, TX 78731",
    scopeDescription: "Living room wall water stain patch and paint touchup.",
    notes: "Closed out with manager approval.",
    images: [],
    progressPercent: 100,
    tabCategory: "completed",
  },
];

export default function ServiceProviderOverview(): React.ReactElement {
  const [jobRequests, setJobRequests] = useState<OverviewJobItem[]>(initialJobRequests);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Filter Tab State for Option 1: Strict Tab Filtering
  const [activeTabFilter, setActiveTabFilter] = useState<"all" | "assigned" | "upcoming" | "completed" | "earnings">("all");

  // Modals state
  const [selectedJob, setSelectedJob] = useState<OverviewJobItem | null>(null);
  const [progressModalJob, setProgressModalJob] = useState<OverviewJobItem | null>(null);
  const [discussionJob, setDiscussionJob] = useState<OverviewJobItem | null>(null);
  const [changeRequestJob, setChangeRequestJob] = useState<OverviewJobItem | null>(null);
  const [reassignJob, setReassignJob] = useState<OverviewJobItem | null>(null);

  // Form states for modals
  const [progressValue, setProgressValue] = useState<number>(50);
  const [progressNote, setProgressNote] = useState<string>("");
  const [selectedProgressStatus, setSelectedProgressStatus] = useState<"In Progress" | "Completed">("In Progress");

  const [discussionMessage, setDiscussionMessage] = useState<string>("");
  const [changeType, setChangeType] = useState<string>("Scope Adjustment");
  const [changeDetails, setChangeDetails] = useState<string>("");
  const [reassignReason, setReassignReason] = useState<string>("Schedule Conflict");
  const [reassignNotes, setReassignNotes] = useState<string>("");

  // Statistics Definition
  const stats = [
    {
      id: "assigned",
      tabKey: "assigned" as const,
      label: "TODAY'S WORK ORDERS",
      value: "5",
      subtext: "Assigned Jobs",
      icon: Wrench,
      iconBg: "bg-[#F0E6FC] text-[#8E25E3]",
      linkColor: "text-[#8E25E3]",
    },
    {
      id: "upcoming",
      tabKey: "upcoming" as const,
      label: "UPCOMING WORK ORDERS",
      value: "3",
      subtext: "Scheduled next 7 days",
      icon: Clock,
      iconBg: "bg-[#FEF3C7] text-[#D97706]",
      linkColor: "text-[#D97706]",
    },
    {
      id: "completed",
      tabKey: "completed" as const,
      label: "COMPLETED",
      value: "2",
      subtext: "Work Orders closed this month",
      icon: CheckCircle2,
      iconBg: "bg-[#DBEAFE] text-[#2563EB]",
      linkColor: "text-[#2563EB]",
    },
    {
      id: "earnings",
      tabKey: "earnings" as const,
      label: "PAID THIS MONTH",
      value: "$ 300",
      subtext: "$1,100 Awaiting Payment",
      icon: DollarSign,
      iconBg: "bg-[#D1FAE5] text-[#059669]",
      linkColor: "text-[#059669]",
    },
  ];

  // Filtering Logic for Strict Tab Filtering (Option 1)
  const filteredJobRequests = jobRequests.filter((job) => {
    if (activeTabFilter === "all") return true;
    if (activeTabFilter === "assigned") return job.tabCategory === "assigned" || job.status === "In Progress";
    if (activeTabFilter === "upcoming") return job.tabCategory === "upcoming" || job.status === "Pending";
    if (activeTabFilter === "completed") return job.tabCategory === "completed" || job.status === "Completed";
    if (activeTabFilter === "earnings") return job.status === "Completed";
    return true;
  });

  const handleAcceptJob = (jobId: string) => {
    setJobRequests((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? {
            ...j,
            status: "In Progress",
            tabCategory: "assigned",
            statusStyle: "bg-blue-100 text-blue-800 border border-blue-200/80",
            progressPercent: 15,
          }
          : j
      )
    );
    toast.success(`Job ${jobId} accepted! Status changed to In Progress.`);
  };

  const handleSaveProgress = () => {
    if (!progressModalJob) return;
    setJobRequests((prev) =>
      prev.map((j) =>
        j.id === progressModalJob.id
          ? {
            ...j,
            status: selectedProgressStatus,
            tabCategory: selectedProgressStatus === "Completed" ? "completed" : "assigned",
            statusStyle:
              selectedProgressStatus === "Completed"
                ? "bg-emerald-100 text-emerald-800 border border-emerald-200/80"
                : "bg-blue-100 text-blue-800 border border-blue-200/80",
            progressPercent: selectedProgressStatus === "Completed" ? 100 : progressValue,
          }
          : j
      )
    );
    toast.success(`Progress updated for ${progressModalJob.id}`);
    setProgressModalJob(null);
    setProgressNote("");
  };

  const handleSendDiscussion = () => {
    if (!discussionJob || !discussionMessage.trim()) return;
    toast.success(`Message sent to ${discussionJob.postedBy}`);
    setDiscussionJob(null);
    setDiscussionMessage("");
  };

  const handleSendChangeRequest = () => {
    if (!changeRequestJob || !changeDetails.trim()) return;
    toast.success(`Change request for ${changeRequestJob.id} submitted.`);
    setChangeRequestJob(null);
    setChangeDetails("");
  };

  const handleSendReassignment = () => {
    if (!reassignJob) return;
    toast.success(`Reassignment request for ${reassignJob.id} submitted to Property Manager.`);
    setReassignJob(null);
    setReassignNotes("");
  };

  return (
    <div className="space-y-6">
      {/* Click outside listener for 3-dots dropdown */}
      {activeMenuId && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setActiveMenuId(null)}
        />
      )}

      {/* Header Section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2 tracking-tight">
          Hi, James 👋
        </h1>
        <p className="text-sm text-gray-700 font-medium mt-1">
          Your <span className="font-semibold text-[#8E25E3]">ProjexPro</span> dashboard shows you have 5 work orders scheduled today.
        </p>
        <p className="text-xs sm:text-sm text-gray-400 font-normal mt-1.5">
          Friday, June 26, 2026.
        </p>
      </div>

      {/* Top 4 Stats Cards Grid - Clickable Filter Tabs (Option 1: Strict Tab Filtering) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat) => {
          const IconComp = stat.icon;
          const isSelected = activeTabFilter === stat.tabKey;
          return (
            <div
              key={stat.id}
              onClick={() => setActiveTabFilter(isSelected ? "all" : stat.tabKey)}
              className={`bg-[#FFFFFF] border rounded-xl p-5 flex flex-col justify-between shadow-2xs transition-all cursor-pointer group relative ${isSelected
                  ? "border-[#8E25E3] ring-2 ring-[#8E25E3]/30 bg-purple-50/20"
                  : "border-[#E5E7EB] hover:shadow-md hover:border-[#8E25E3]/40"
                }`}
            >
              {isSelected && (
                <span className="absolute top-2.5 right-3 text-[10px] font-bold uppercase tracking-wider text-[#8E25E3] bg-[#F0E6FC] px-2 py-0.5 rounded-full border border-[#8E25E3]/20">
                  Selected Filter
                </span>
              )}
              <div>
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.iconBg} group-hover:scale-105 transition-transform`}
                  >
                    <IconComp className="w-4.5 h-4.5" />
                  </div>
                  <h2 className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                    {stat.label}
                  </h2>
                </div>

                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-gray-900 tracking-tight block">
                    {stat.value}
                  </span>
                  <p className="text-xs font-medium text-gray-500 mt-1">
                    {stat.subtext}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-gray-100 flex items-center justify-between">
                <span
                  className={`text-xs font-semibold underline decoration-solid underline-offset-2 ${stat.linkColor} group-hover:opacity-80 transition-opacity`}
                >
                  Click for Details
                </span>
                <ArrowRight className={`w-3.5 h-3.5 ${stat.linkColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left Column: Action Center */}
        <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 flex flex-col shadow-2xs min-h-[600px]">
          <div className="shrink-0 mb-4">
            <h2 className="text-base sm:text-lg font-bold text-[#6B1294] tracking-wide uppercase">
              ACTION CENTER
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1.5 max-h-[640px]">
            {/* Card 1: 2 Matched Jobs */}
            <div className="bg-[#FFFFFF] border border-gray-200/90 rounded-2xl p-4 sm:p-4.5 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#F0E6FC] flex items-center justify-center shrink-0 mt-0.5">
                  <Search className="w-5 h-5 text-[#6B1294]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                    2 Matched Jobs
                  </h3>
                  <p className="text-xs text-gray-500 font-normal mt-1 leading-snug">
                    Review matches for your service area
                  </p>
                </div>
              </div>
              <div className="mt-3.5">
                <Link
                  href="/services_provider/job_request"
                  className="w-full bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-2xs block text-center transition-all active:scale-[0.99]"
                >
                  View Matched Jobs
                </Link>
              </div>
            </div>

            {/* Card 2: 1 Job Ready for Closeout */}
            <div className="bg-[#FFFFFF] border border-gray-200/90 rounded-2xl p-4 sm:p-4.5 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#F0E6FC] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-[#6B1294]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                    1 Job Ready for Closeout
                  </h3>
                </div>
              </div>
              <div className="mt-3.5">
                <button
                  type="button"
                  onClick={() => {
                    const readyJob = jobRequests.find((j) => j.status === "In Progress") || jobRequests[0];
                    if (readyJob) {
                      setProgressModalJob(readyJob);
                      setProgressValue(readyJob.progressPercent || 90);
                      setSelectedProgressStatus("In Progress");
                    }
                  }}
                  className="w-full bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-2xs block text-center transition-all active:scale-[0.99] cursor-pointer"
                >
                  Submit Completion
                </button>
              </div>
            </div>

            {/* Card 3: 1 Invoice Ready */}
            <div className="bg-[#FFFFFF] border border-gray-200/90 rounded-2xl p-4 sm:p-4.5 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#F0E6FC] flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-5 h-5 text-[#6B1294]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                    1 Invoice Ready
                  </h3>
                </div>
              </div>
              <div className="mt-3.5">
                <Link
                  href="/services_provider/payment"
                  className="w-full bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-2xs block text-center transition-all active:scale-[0.99]"
                >
                  Review Billing
                </Link>
              </div>
            </div>

            {/* Card 4: Insurance document expires in 14 days */}
            <div className="bg-[#FFFFFF] border border-gray-200/90 rounded-2xl p-4 sm:p-4.5 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#F0E6FC] flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-5 h-5 text-[#6B1294]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                    Insurance document expires in 14 days
                  </h3>
                </div>
              </div>
              <div className="mt-3.5">
                <Link
                  href="/services_provider/profile"
                  className="w-full bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-2xs block text-center transition-all active:scale-[0.99]"
                >
                  Update Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Work Order Section */}
        <div className="lg:col-span-8 bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 flex flex-col shadow-2xs min-h-[600px]">
          {/* Header & Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 shrink-0">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                {activeTabFilter === "all" && "All Work Orders"}
                {activeTabFilter === "assigned" && "Today&apos;s Assigned Work Orders"}
                {activeTabFilter === "upcoming" && "Upcoming Work Orders"}
                {activeTabFilter === "completed" && "Completed Work Orders"}
                {activeTabFilter === "earnings" && "Paid / Earned Work Orders"}
                <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {filteredJobRequests.length}
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setActiveTabFilter("all")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${activeTabFilter === "all"
                    ? "bg-[#8E25E3] text-white shadow-2xs"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveTabFilter("assigned")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${activeTabFilter === "assigned"
                    ? "bg-[#8E25E3] text-white shadow-2xs"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
              >
                Today&apos;s (5)
              </button>
              <button
                type="button"
                onClick={() => setActiveTabFilter("upcoming")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${activeTabFilter === "upcoming"
                    ? "bg-[#8E25E3] text-white shadow-2xs"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
              >
                Upcoming (3)
              </button>
              <button
                type="button"
                onClick={() => setActiveTabFilter("completed")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${activeTabFilter === "completed"
                    ? "bg-[#8E25E3] text-white shadow-2xs"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
              >
                Completed (2)
              </button>
            </div>
          </div>

          {/* Option 1 Filter Banner Notice if specific tab active */}
          {activeTabFilter !== "all" && (
            <div className="mb-3.5 px-3.5 py-2 bg-purple-50 border border-purple-200/80 rounded-xl text-xs text-[#8E25E3] flex items-center justify-between">
              <span>
                Showing only work orders for: <strong className="uppercase">{activeTabFilter}</strong>
              </span>
              <button
                type="button"
                onClick={() => setActiveTabFilter("all")}
                className="underline hover:text-purple-900 font-medium"
              >
                Clear Filter
              </button>
            </div>
          )}

          {/* Job Request Items List */}
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1.5 max-h-[580px]">
            {filteredJobRequests.length === 0 ? (
              <div className="py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-sm font-medium">No work orders match this tab category.</p>
                <button
                  type="button"
                  onClick={() => setActiveTabFilter("all")}
                  className="mt-2 text-xs font-bold text-[#8E25E3] underline"
                >
                  View all work orders
                </button>
              </div>
            ) : (
              filteredJobRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-gray-300 hover:shadow-2xs relative"
                >
                  {/* Left Side: Job Info + Scheduled Time */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {req.scheduledTime && (
                        <span className="text-xs font-extrabold text-[#6B1294] bg-purple-100 px-2 py-0.5 rounded-md">
                          {req.scheduledTime}
                        </span>
                      )}
                      <span className="text-xs font-bold text-gray-400 tracking-wider">
                        {req.id}
                      </span>
                      <span className={`text-xs font-bold ${req.priorityColor}`}>
                        {req.priority}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 leading-tight truncate">
                      {req.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-normal">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{req.category}</span>
                    </div>

                    {/* Status Badge placed directly below category */}
                    <div className="pt-1">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full inline-block ${req.statusStyle}`}
                      >
                        {req.status}
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Action Buttons */}
                  <div className="flex items-start gap-1.5 shrink-0 self-end sm:self-center">
                    <div className="flex flex-col gap-1.5 w-32 sm:w-36">
                      {req.status === "In Progress" ? (
                        <button
                          type="button"
                          onClick={() => {
                            setProgressModalJob(req);
                            setProgressValue(req.progressPercent || 50);
                            setSelectedProgressStatus("In Progress");
                          }}
                          className="w-full py-2 px-3 text-xs font-bold text-white bg-[#6B1294] hover:bg-[#580e7d] rounded-lg transition-all shadow-2xs cursor-pointer text-center active:scale-95 whitespace-nowrap h-8 flex items-center justify-center"
                        >
                          Update Progress
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAcceptJob(req.id)}
                          className="w-full py-2 px-3 text-xs font-bold text-white bg-[#6B1294] hover:bg-[#580e7d] rounded-lg transition-all shadow-2xs cursor-pointer text-center active:scale-95 whitespace-nowrap h-8 flex items-center justify-center"
                        >
                          Accept Job
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setSelectedJob(req)}
                        className="w-full py-2 px-3 text-xs font-bold text-[#6B1294] bg-white hover:bg-purple-50/60 border border-[#6B1294]/40 rounded-lg transition-all cursor-pointer text-center active:scale-95 whitespace-nowrap h-8 flex items-center justify-center"
                      >
                        Open Job
                      </button>
                    </div>

                    {/* Three Dots Button */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMenuId(activeMenuId === req.id ? null : req.id)
                        }
                        className="px-2.5 h-8 bg-[#E2E2E5] hover:bg-gray-300 text-gray-700 rounded-lg transition-colors cursor-pointer flex items-center justify-center shrink-0"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {/* Dropdown Popup Menu - Updated options per client requirements */}
                      {activeMenuId === req.id && (
                        <div className="absolute right-0 top-full mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
                          {/* 1. View Work Order Details */}
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedJob(req);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors text-left"
                          >
                            <Info className="w-4 h-4 text-blue-600 shrink-0" />
                            <span>View Work Order Details</span>
                          </button>

                          {/* 2. Discuss This Work Order */}
                          <button
                            type="button"
                            onClick={() => {
                              setDiscussionJob(req);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors text-left"
                          >
                            <MessageSquare className="w-4 h-4 text-purple-600 shrink-0" />
                            <span>Discuss This Work Order</span>
                          </button>

                          {/* 3. Submit Change Request */}
                          <button
                            type="button"
                            onClick={() => {
                              setChangeRequestJob(req);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors text-left"
                          >
                            <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Submit Change Request</span>
                          </button>

                          {/* 4. Request To Reassign */}
                          <button
                            type="button"
                            onClick={() => {
                              setReassignJob(req);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors text-left"
                          >
                            <ArrowLeftRight className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>Request To Reassign</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 1. VIEW WORK ORDER DETAILS MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-xl p-6 sm:p-7 sm:max-w-2xl w-full shadow-2xl relative max-h-[92vh] overflow-y-auto space-y-4 border border-[#E5E7EB]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-gray-400 tracking-wider block">
                  {selectedJob.id}
                </span>
                <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                  {selectedJob.title}
                </h2>
                <p className="text-xs text-gray-500 font-normal mt-0.5">
                  Posted By: {selectedJob.postedBy}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${selectedJob.statusStyle}`}>
                {selectedJob.status}
              </span>
              <span className={`text-xs font-bold ${selectedJob.priorityColor}`}>
                Priority: {selectedJob.priority}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3.5">
                <span className="text-xs text-gray-400 font-normal block">Job Category</span>
                <span className="text-sm font-bold text-gray-900 mt-1 block">{selectedJob.category}</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3.5">
                <span className="text-xs text-gray-400 font-normal block">Payout Fee</span>
                <span className="text-sm font-bold text-gray-900 mt-1 block">{selectedJob.payout}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3.5">
                <span className="text-xs text-gray-400 font-normal block">Unit / Suite</span>
                <span className="text-sm font-bold text-gray-900 mt-1 block">{selectedJob.unit}</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3.5">
                <span className="text-xs text-gray-400 font-normal block">Scheduled Date</span>
                <span className="text-sm font-bold text-gray-900 mt-1 block">{selectedJob.scheduledDate} {selectedJob.scheduledTime ? `(${selectedJob.scheduledTime})` : ""}</span>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3.5">
              <span className="text-xs text-gray-400 font-normal block">Job Site Address</span>
              <div className="flex items-center gap-1.5 text-sm font-bold text-gray-900 mt-1">
                <MapPin className="w-4 h-4 text-[#6B1294] shrink-0" />
                <span>{selectedJob.address}</span>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3.5">
              <span className="text-xs text-gray-400 font-normal block">Scope of Work</span>
              <p className="text-xs text-gray-800 font-normal mt-1 leading-relaxed">
                {selectedJob.scopeDescription}
              </p>
            </div>

            {selectedJob.notes && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3.5">
                <span className="text-xs text-gray-400 font-normal block">Site Notes</span>
                <p className="text-xs text-gray-800 font-normal mt-1">{selectedJob.notes}</p>
              </div>
            )}

            {selectedJob.images && selectedJob.images.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3.5">
                <span className="text-xs text-gray-400 font-normal block mb-2">Job Photos</span>
                <div className="flex items-center gap-2.5 overflow-x-auto">
                  {selectedJob.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="Job attachment"
                      className="w-24 h-16 object-cover rounded-lg border border-gray-300 shrink-0"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 pt-3">
              {selectedJob.status !== "In Progress" && selectedJob.status !== "Completed" && (
                <button
                  type="button"
                  onClick={() => {
                    handleAcceptJob(selectedJob.id);
                    setSelectedJob(null);
                  }}
                  className="flex-1 bg-[#6B1294] hover:bg-[#580e7d] text-white font-bold py-3 px-4 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  Accept Work Order
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg text-sm transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. UPDATE PROGRESS MODAL */}
      {progressModalJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-xl p-6 sm:p-7 sm:max-w-lg w-full shadow-2xl relative space-y-4 border border-[#E5E7EB]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#6B1294] tracking-wider block">
                  Update Work Progress
                </span>
                <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                  {progressModalJob.title} ({progressModalJob.id})
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setProgressModalJob(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Work Status
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedProgressStatus("In Progress")}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${selectedProgressStatus === "In Progress"
                      ? "bg-blue-50 border-blue-500 text-blue-800"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  In Progress
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProgressStatus("Completed");
                    setProgressValue(100);
                  }}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${selectedProgressStatus === "Completed"
                      ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  Mark as Completed
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-gray-700">Completion Percentage</label>
                <span className="text-xs font-bold text-[#6B1294]">{progressValue}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={progressValue}
                onChange={(e) => setProgressValue(Number(e.target.value))}
                className="w-full accent-[#6B1294] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Progress Notes & Updates
              </label>
              <textarea
                rows={3}
                value={progressNote}
                onChange={(e) => setProgressNote(e.target.value)}
                placeholder="Describe current status, tasks completed, or required next steps..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#6B1294] outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleSaveProgress}
                className="flex-1 bg-[#6B1294] hover:bg-[#580e7d] text-white font-bold py-3 px-4 rounded-lg text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save Progress</span>
              </button>
              <button
                type="button"
                onClick={() => setProgressModalJob(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg text-sm transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. DISCUSS THIS WORK ORDER MODAL */}
      {discussionJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-xl p-6 sm:p-7 sm:max-w-lg w-full shadow-2xl relative space-y-4 border border-[#E5E7EB]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#6B1294] tracking-wider block">
                  Discuss This Work Order
                </span>
                <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                  {discussionJob.title} ({discussionJob.id})
                </h2>
                <p className="text-xs text-gray-500 font-normal mt-0.5">
                  To: {discussionJob.postedBy}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDiscussionJob(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Message / Inquiry
              </label>
              <textarea
                rows={4}
                value={discussionMessage}
                onChange={(e) => setDiscussionMessage(e.target.value)}
                placeholder="Ask clarifying questions regarding access, materials, or scope..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#6B1294] outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleSendDiscussion}
                className="flex-1 bg-[#6B1294] hover:bg-[#580e7d] text-white font-bold py-3 px-4 rounded-lg text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
              <button
                type="button"
                onClick={() => setDiscussionJob(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg text-sm transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. SUBMIT CHANGE REQUEST MODAL */}
      {changeRequestJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-xl p-6 sm:p-7 sm:max-w-lg w-full shadow-2xl relative space-y-4 border border-[#E5E7EB]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-600 tracking-wider block">
                  Submit Change Request
                </span>
                <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                  {changeRequestJob.title} ({changeRequestJob.id})
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setChangeRequestJob(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Change Type
              </label>
              <select
                value={changeType}
                onChange={(e) => setChangeType(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:bg-white focus:border-[#6B1294] outline-none"
              >
                <option value="Scope Adjustment">Scope Adjustment</option>
                <option value="Timeline Extension">Timeline Extension</option>
                <option value="Material Cost Adjustment">Material Cost Adjustment</option>
                <option value="Specialized Equipment Request">Specialized Equipment Request</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Change Details & Justification
              </label>
              <textarea
                rows={3}
                value={changeDetails}
                onChange={(e) => setChangeDetails(e.target.value)}
                placeholder="Describe the requested changes and rationale..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#6B1294] outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleSendChangeRequest}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg text-sm transition-colors cursor-pointer"
              >
                Submit Change Request
              </button>
              <button
                type="button"
                onClick={() => setChangeRequestJob(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg text-sm transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. REQUEST TO REASSIGN MODAL */}
      {reassignJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-xl p-6 sm:p-7 sm:max-w-lg w-full shadow-2xl relative space-y-4 border border-[#E5E7EB]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-amber-600 tracking-wider block">
                  Request To Reassign
                </span>
                <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                  {reassignJob.title} ({reassignJob.id})
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setReassignJob(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Reason for Reassignment Request
              </label>
              <select
                value={reassignReason}
                onChange={(e) => setReassignReason(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:bg-white focus:border-[#6B1294] outline-none"
              >
                <option value="Schedule Conflict">Schedule Conflict</option>
                <option value="Out of Skill Scope">Out of Skill Scope</option>
                <option value="Specialized Equipment Required">Specialized Equipment Required</option>
                <option value="Distance / Location Issues">Distance / Location Issues</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Additional Context
              </label>
              <textarea
                rows={3}
                value={reassignNotes}
                onChange={(e) => setReassignNotes(e.target.value)}
                placeholder="Explain why this job should be reassigned to another Service Pro..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#6B1294] outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleSendReassignment}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg text-sm transition-colors cursor-pointer"
              >
                Submit Reassignment
              </button>
              <button
                type="button"
                onClick={() => setReassignJob(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg text-sm transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

