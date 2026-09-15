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
  AlertTriangle,
  X,
  Send,
  Check,
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
  address: string;
  scopeDescription: string;
  notes: string;
  images: string[];
  progressPercent: number;
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
    scheduledDate: "July 24, 2026 (09:00 AM)",
    address: "410 Maple St, Austin, TX 78703",
    scopeDescription: "Kitchen sink pipe leakage fix and new faucet installation.",
    notes: "Tenant will be at home during repair. Gate code #4412.",
    images: ["/images/prop_5.png"],
    progressPercent: 40,
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
    scheduledDate: "July 27, 2026 (10:30 AM)",
    address: "120 Riverside Dr, Austin, TX 78702",
    scopeDescription: "Circuit breaker tripping investigation and outlet replacement.",
    notes: "Main breaker panel is located in the basement.",
    images: ["/images/prop_3.png"],
    progressPercent: 0,
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
    scheduledDate: "July 26, 2026 (08:30 AM)",
    address: "320 Sunset Loop, Austin, TX 78745",
    scopeDescription: "Full roof tile leak assessment following heavy storm.",
    notes: "Ladder access located at North wing entrance.",
    images: ["/images/prop_1.png"],
    progressPercent: 0,
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
    scheduledDate: "July 24, 2026 (02:00 PM)",
    address: "742 Harbor View Ave, Austin, TX 78701",
    scopeDescription: "Hardwood flooring installation in main hallway and living area.",
    notes: "Elevator access key available at front desk.",
    images: ["/images/prop_2.png", "/images/prop_4.png"],
    progressPercent: 65,
  },
];

export default function ServiceProviderOverview(): React.ReactElement {
  const [jobRequests, setJobRequests] = useState<OverviewJobItem[]>(initialJobRequests);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Modals state
  const [selectedJob, setSelectedJob] = useState<OverviewJobItem | null>(null);
  const [progressModalJob, setProgressModalJob] = useState<OverviewJobItem | null>(null);
  const [discussionJob, setDiscussionJob] = useState<OverviewJobItem | null>(null);
  const [reassignJob, setReassignJob] = useState<OverviewJobItem | null>(null);
  const [reportIssueJob, setReportIssueJob] = useState<OverviewJobItem | null>(null);

  // Form states for modals
  const [progressValue, setProgressValue] = useState<number>(50);
  const [progressNote, setProgressNote] = useState<string>("");
  const [selectedProgressStatus, setSelectedProgressStatus] = useState<"In Progress" | "Completed">("In Progress");

  const [discussionMessage, setDiscussionMessage] = useState<string>("");
  const [reassignReason, setReassignReason] = useState<string>("Schedule Conflict");
  const [reassignNotes, setReassignNotes] = useState<string>("");
  const [issueType, setIssueType] = useState<string>("Access Issue");
  const [issueDetails, setIssueDetails] = useState<string>("");

  // Statistics
  const stats = [
    {
      id: "assigned",
      label: "Assigned Jobs",
      value: "5",
      icon: Wrench,
      iconBg: "bg-[#F0E6FC] text-[#8E25E3]",
      linkColor: "text-[#8E25E3]",
      href: "/services_provider/job_request",
    },
    {
      id: "upcoming",
      label: "Upcoming Jobs",
      value: "3",
      icon: Clock,
      iconBg: "bg-[#FEF3C7] text-[#D97706]",
      linkColor: "text-[#D97706]",
      href: "/services_provider/job_request",
    },
    {
      id: "completed",
      label: "Completed Jobs",
      value: "2",
      icon: CheckCircle2,
      iconBg: "bg-[#DBEAFE] text-[#2563EB]",
      linkColor: "text-[#2563EB]",
      href: "/services_provider/job_request",
    },
    {
      id: "earnings",
      label: "Earnings",
      value: "$ 300",
      icon: DollarSign,
      iconBg: "bg-[#D1FAE5] text-[#059669]",
      linkColor: "text-[#059669]",
      href: "/services_provider/payment",
    },
  ];

  // Mock assigned jobs for today timeline
  const assignedJobsToday = [
    {
      id: 1,
      time: "Jun 26th 08:00 AM",
      title: "Maple Heights Apt",
      category: "Plumbing Repair",
      active: true,
    },
    {
      id: 2,
      time: "Jun 26th 08:00 AM",
      title: "Harbor View Lofts",
      category: "Flooring Installation",
      active: false,
    },
    {
      id: 3,
      time: "Jun 26th 08:00 AM",
      title: "Pine Ridge Complex",
      category: "Window Replacement",
      active: false,
    },
  ];

  const handleAcceptJob = (jobId: string) => {
    setJobRequests((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? {
              ...j,
              status: "In Progress",
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

  const handleSendReassignment = () => {
    if (!reassignJob) return;
    toast.success(`Reassignment request for ${reassignJob.id} submitted to Property Manager.`);
    setReassignJob(null);
    setReassignNotes("");
  };

  const handleSendIssueReport = () => {
    if (!reportIssueJob || !issueDetails.trim()) return;
    toast.error(`Issue reported for ${reportIssueJob.id}. Property Manager notified.`);
    setReportIssueJob(null);
    setIssueDetails("");
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
        <p className="text-sm text-gray-600 font-medium mt-1">
          Your <span className="font-semibold text-[#8E25E3]">ProjexPro</span> dashboard shows you have work orders scheduled today.
        </p>
        <p className="text-xs sm:text-sm text-gray-400 font-normal mt-1.5">
          Friday, June 26, 2026.
        </p>
      </div>

      {/* Top 4 Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat) => {
          const IconComp = stat.icon;
          return (
            <Link
              key={stat.id}
              href={stat.href}
              className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-[#8E25E3]/40 transition-all cursor-pointer group"
            >
              <div>
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.iconBg} group-hover:scale-105 transition-transform`}
                >
                  <IconComp className="w-5 h-5" />
                </div>
                <div className="mt-4">
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {stat.value}
                  </h2>
                  <p className="text-sm font-normal text-gray-500 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <span
                  className={`text-xs font-semibold underline decoration-solid underline-offset-2 ${stat.linkColor} group-hover:opacity-80 transition-opacity`}
                >
                  Click for Details
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left Column: Assigned Job Today */}
        <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Today&apos;s Assigned Jobs
            </h2>
            <p className="text-xs text-gray-500 font-normal mt-0.5 mb-6">
              Payout on completion: $200.23
            </p>

            <div className="space-y-6 relative pl-1">
              {assignedJobsToday.map((job, idx) => (
                <div key={job.id} className="relative flex items-start gap-4">
                  {/* Timeline connector dot and line */}
                  <div className="flex flex-col items-center self-stretch pt-1">
                    <div
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        job.active
                          ? "bg-[#8E25E3] ring-4 ring-[#F0E6FC]"
                          : "bg-gray-300"
                      }`}
                    />
                    {idx !== assignedJobsToday.length - 1 && (
                      <div className="w-[1.5px] bg-gray-300/80 flex-1" />
                    )}
                  </div>

                  {/* Job Details & Link */}
                  <div className="flex-1 flex items-center justify-between min-w-0 pb-1">
                    <div>
                      <span className="text-[11px] text-gray-400 font-normal block leading-none">
                        {job.time}
                      </span>
                      <h3 className="text-sm font-semibold text-gray-900 mt-1 leading-tight truncate">
                        {job.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-normal mt-0.5 leading-tight truncate">
                        {job.category}
                      </p>
                    </div>

                    <Link
                      href="/services_provider/job_request"
                      className="text-xs font-semibold text-[#8E25E3] hover:underline flex items-center gap-1 shrink-0 ml-2"
                    >
                      <span>View all</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Job Request */}
        <div className="lg:col-span-8 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="text-lg font-bold text-gray-900">Job Request</h2>
            <Link
              href="/services_provider/job_request"
              className="text-xs font-semibold text-[#8E25E3] hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Job Request Items List */}
          <div className="space-y-3.5">
            {jobRequests.map((req) => (
              <div
                key={req.id}
                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-gray-300 hover:shadow-2xs relative"
              >
                {/* Left Side: Job Info + Status Badge underneath category */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
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

                  {/* Status Badge placed directly below category on left side */}
                  <div className="pt-1">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full inline-block ${req.statusStyle}`}
                    >
                      {req.status}
                    </span>
                  </div>
                </div>

                {/* Right Side: Action Buttons with same width for Accept Job & Open Job */}
                <div className="flex items-start gap-1.5 shrink-0 self-end sm:self-center">
                  {/* Column for Accept Job & Open Job buttons with identical width */}
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

                  {/* Three Dots Button - sits next to Accept Job button with same h-8 height */}
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

                    {/* Dropdown Popup Menu */}
                    {activeMenuId === req.id && (
                      <div className="absolute right-0 top-full mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedJob(req);
                            setActiveMenuId(null);
                          }}
                          className="w-full px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors text-left"
                        >
                          <Info className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>View Job Details</span>
                        </button>

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

                        <button
                          type="button"
                          onClick={() => {
                            setReassignJob(req);
                            setActiveMenuId(null);
                          }}
                          className="w-full px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors text-left"
                        >
                          <ArrowLeftRight className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Request Reassignment</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setReportIssueJob(req);
                            setActiveMenuId(null);
                          }}
                          className="w-full px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors text-left"
                        >
                          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                          <span>Report an Issue</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1. VIEW JOB DETAILS MODAL */}
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
                <span className="text-sm font-bold text-gray-900 mt-1 block">{selectedJob.scheduledDate}</span>
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

            {/* Status Select */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Work Status
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedProgressStatus("In Progress")}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    selectedProgressStatus === "In Progress"
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
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    selectedProgressStatus === "Completed"
                      ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Mark as Completed
                </button>
              </div>
            </div>

            {/* Completion Percentage Slider */}
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

            {/* Work Note */}
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

      {/* 3. DISCUSS WORK ORDER MODAL */}
      {discussionJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-xl p-6 sm:p-7 sm:max-w-lg w-full shadow-2xl relative space-y-4 border border-[#E5E7EB]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#6B1294] tracking-wider block">
                  Work Order Discussion
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

      {/* 4. REQUEST REASSIGNMENT MODAL */}
      {reassignJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-xl p-6 sm:p-7 sm:max-w-lg w-full shadow-2xl relative space-y-4 border border-[#E5E7EB]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-amber-600 tracking-wider block">
                  Request Reassignment
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
                Reason for Reassignment
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
                Submit Request
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

      {/* 5. REPORT AN ISSUE MODAL */}
      {reportIssueJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-xl p-6 sm:p-7 sm:max-w-lg w-full shadow-2xl relative space-y-4 border border-[#E5E7EB]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-red-600 tracking-wider block">
                  Report Work Order Issue
                </span>
                <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                  {reportIssueJob.title} ({reportIssueJob.id})
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setReportIssueJob(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Issue Type
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:bg-white focus:border-red-500 outline-none"
              >
                <option value="Access Issue">Site Access Blocked / No Gate Code</option>
                <option value="Safety Hazard">Safety Hazard / Hazardous Condition</option>
                <option value="Scope Discrepancy">Job Scope Discrepancy</option>
                <option value="Unforeseen Property Damage">Unforeseen Structural / Property Damage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Detailed Description of Issue
              </label>
              <textarea
                rows={4}
                value={issueDetails}
                onChange={(e) => setIssueDetails(e.target.value)}
                placeholder="Provide clear details so property management can resolve the issue immediately..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleSendIssueReport}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg text-sm transition-colors cursor-pointer"
              >
                Report Issue
              </button>
              <button
                type="button"
                onClick={() => setReportIssueJob(null)}
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
