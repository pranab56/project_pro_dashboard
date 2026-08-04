"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Eye,
  X,
  MapPin,
  Clock,
  ArrowUpDown,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface JobRequestItem {
  id: string;
  propertyName: string;
  clientName: string;
  serviceRequest: string;
  taskLevel: "High" | "Medium" | "Low";
  assignedDate: string;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  payout: string;
  postedBy: string;
  unit: string;
  scheduledDate: string;
  address: string;
  scopeDescription: string;
  notes: string;
  images: string[];
}

const mockJobRequests: JobRequestItem[] = [
  {
    id: "JOB-008",
    propertyName: "Pine Ridge Complex",
    clientName: "Robert Kim",
    serviceRequest: "Window Replacement",
    taskLevel: "Medium",
    assignedDate: "Jun 26, 2026",
    status: "Pending",
    payout: "$150",
    postedBy: "Alex (Property Manager)",
    unit: "Apartment 3B",
    scheduledDate: "July 25, 2026 (10:00 AM)",
    address: "258 Pine Ridge Rd, Austin, TX 78708",
    scopeDescription: "Living room window glass is cracked and needs full replacement.",
    notes: "Gate code #4412. or Dog at property etc.",
    images: [
      "/images/prop_1.png",
      "/images/prop_3.png",
      "/images/prop_5.png",
    ],
  },
  {
    id: "JOB-006",
    propertyName: "Harbor View Lofts",
    clientName: "James Wilson",
    serviceRequest: "Flooring Installation",
    taskLevel: "High",
    assignedDate: "Jun 25, 2026",
    status: "In Progress",
    payout: "$450",
    postedBy: "Sarah (Operations Lead)",
    unit: "Unit 12A",
    scheduledDate: "July 24, 2026 (02:00 PM)",
    address: "742 Harbor View Ave, Austin, TX 78701",
    scopeDescription: "Hardwood flooring installation in main hallway and living area.",
    notes: "Elevator access key available at front desk.",
    images: [
      "/images/prop_2.png",
      "/images/prop_4.png",
    ],
  },
  {
    id: "JOB-007",
    propertyName: "Elmwood Estates",
    clientName: "Anna Martinez",
    serviceRequest: "Landscaping",
    taskLevel: "Low",
    assignedDate: "Jun 25, 2026",
    status: "Completed",
    payout: "$200",
    postedBy: "Mark (Property Owner)",
    unit: "Main Yard",
    scheduledDate: "July 20, 2026 (09:00 AM)",
    address: "109 Elmwood Dr, Austin, TX 78704",
    scopeDescription: "Lawn trimming, bush pruning, and general garden clean up.",
    notes: "Backyard sprinkler system check required.",
    images: [
      "/images/prop_6.png",
    ],
  },
  {
    id: "JOB-005",
    propertyName: "The Wellington",
    clientName: "Lisa Thompson",
    serviceRequest: "Painting",
    taskLevel: "Medium",
    assignedDate: "Jun 24, 2026",
    status: "Cancelled",
    payout: "$300",
    postedBy: "Lisa Thompson",
    unit: "Suite 402",
    scheduledDate: "July 18, 2026 (11:00 AM)",
    address: "550 Wellington Blvd, Austin, TX 78705",
    scopeDescription: "Accent wall paint touchup in master bedroom.",
    notes: "Cancelled by client due to schedule conflict.",
    images: [],
  },
  {
    id: "JOB-004",
    propertyName: "Sunset Gardens",
    clientName: "David Park",
    serviceRequest: "Roof Inspection",
    taskLevel: "High",
    assignedDate: "Jun 23, 2026",
    status: "Pending",
    payout: "$280",
    postedBy: "Alex (Property Manager)",
    unit: "Building B Roof",
    scheduledDate: "July 26, 2026 (08:30 AM)",
    address: "320 Sunset Loop, Austin, TX 78745",
    scopeDescription: "Full roof tile leak assessment following heavy storm.",
    notes: "Ladder access located at North wing entrance.",
    images: [
      "/images/prop_1.png",
    ],
  },
  {
    id: "JOB-003",
    propertyName: "Oakwood Villas",
    clientName: "Emily Rodriguez",
    serviceRequest: "HVAC Maintenance",
    taskLevel: "Low",
    assignedDate: "Jun 22, 2026",
    status: "Completed",
    payout: "$180",
    postedBy: "Emily Rodriguez",
    unit: "Villa 14",
    scheduledDate: "July 15, 2026 (01:00 PM)",
    address: "88 Oakwood Way, Austin, TX 78749",
    scopeDescription: "AC filter replacement and refrigerant level check.",
    notes: "Service completed cleanly.",
    images: [],
  },
  {
    id: "JOB-002",
    propertyName: "Riverside Condos",
    clientName: "Marcus Chen",
    serviceRequest: "Electrical Inspection",
    taskLevel: "Medium",
    assignedDate: "Jun 21, 2026",
    status: "Pending",
    payout: "$220",
    postedBy: "Marcus Chen",
    unit: "Condo 501",
    scheduledDate: "July 27, 2026 (10:30 AM)",
    address: "120 Riverside Dr, Austin, TX 78702",
    scopeDescription: "Circuit breaker tripping investigation and outlet replacement.",
    notes: "Main breaker panel is in basement.",
    images: [
      "/images/prop_3.png",
    ],
  },
  {
    id: "JOB-001",
    propertyName: "Maple Heights Apt",
    clientName: "Sarah Johnson",
    serviceRequest: "Plumbing Repair",
    taskLevel: "High",
    assignedDate: "Jun 20, 2026",
    status: "In Progress",
    payout: "$350",
    postedBy: "Sarah Johnson",
    unit: "Unit 204",
    scheduledDate: "July 24, 2026 (09:00 AM)",
    address: "410 Maple St, Austin, TX 78703",
    scopeDescription: "Kitchen sink pipe leakage fix and new faucet installation.",
    notes: "Tenant will be at home during repair.",
    images: [
      "/images/prop_5.png",
    ],
  },
];

export default function JobRequestPage(): React.ReactElement {
  const [jobs, setJobs] = useState<JobRequestItem[]>(mockJobRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [taskLevelFilter, setTaskLevelFilter] = useState("All");
  const [selectedJob, setSelectedJob] = useState<JobRequestItem | null>(null);

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.serviceRequest.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.clientName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || job.status === statusFilter;
      const matchesTaskLevel =
        taskLevelFilter === "All" || job.taskLevel === taskLevelFilter;

      return matchesSearch && matchesStatus && matchesTaskLevel;
    });
  }, [jobs, searchTerm, statusFilter, taskLevelFilter]);

  const handleAcceptJob = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: "In Progress" } : j))
    );
    toast.success(`Job ${jobId} accepted! Status changed to In Progress.`);
    setSelectedJob(null);
  };

  const handleDeclineJob = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: "Cancelled" } : j))
    );
    toast.error(`Job ${jobId} declined.`);
    setSelectedJob(null);
  };

  // Helper for Task Level Indicator Dot & Color
  const getTaskLevelBadge = (level: "High" | "Medium" | "Low") => {
    switch (level) {
      case "High":
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-800">
            <span className="w-2 h-2 rounded-full bg-[#E53935]" />
            High
          </span>
        );
      case "Medium":
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-800">
            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
            Medium
          </span>
        );
      case "Low":
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-800">
            <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
            Low
          </span>
        );
    }
  };

  // Helper for Status Badge styling
  const getStatusBadge = (status: JobRequestItem["status"]) => {
    switch (status) {
      case "Pending":
        return (
          <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-[#FEF3C7] text-[#D97706] inline-block">
            Pending
          </span>
        );
      case "In Progress":
        return (
          <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-[#DBEAFE] text-[#2563EB] inline-block">
            In Progress
          </span>
        );
      case "Completed":
        return (
          <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-[#DCFCE7] text-[#16A34A] inline-block">
            Completed
          </span>
        );
      case "Cancelled":
        return (
          <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-[#FEE2E2] text-[#DC2626] inline-block">
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Job Request
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5 sm:mt-1">
          View and track all active, pending, and past job requests in one place.
        </p>
      </div>

      {/* Top Search & Filter Bar */}
      <div className="bg-[#F9FAFB] border border-gray-300/50 rounded-2xl p-2.5 sm:p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-2xs">
        {/* Search Input Box */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, property, type..."
            className="w-full bg-gray-200/50 border border-gray-300/70 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#5B1B95] transition-all"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          {/* Status Select Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[125px] sm:w-[135px] h-9 bg-gray-200/50 border-gray-300 rounded-xl text-xs font-semibold text-gray-700 focus:ring-0 focus:border-[#5B1B95]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          {/* Task Level Filter */}
          <Select value={taskLevelFilter} onValueChange={setTaskLevelFilter}>
            <SelectTrigger className="w-[130px] sm:w-[140px] h-9 bg-gray-200/50 border-gray-300 rounded-xl text-xs font-semibold text-gray-700 focus:ring-0 focus:border-[#5B1B95]">
              <SelectValue placeholder="All Task Levels" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
              <SelectItem value="All">All Task Levels</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>

          <span className="text-xs text-gray-400 font-normal ml-1">
            {filteredJobs.length} results
          </span>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-[#F9FAFB] border border-gray-300/50 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-gray-300/60 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-4 px-5 sm:px-6">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700">
                    <span>Job ID</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="py-4 px-5 sm:px-6">Property Name</th>
                <th className="py-4 px-5 sm:px-6">Service Request</th>
                <th className="py-4 px-5 sm:px-6">Task Level</th>
                <th className="py-4 px-5 sm:px-6">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700">
                    <span>Assigned Date</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="py-4 px-5 sm:px-6">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700">
                    <span>Status</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="py-4 px-5 sm:px-6 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-300/40 text-sm">
              {filteredJobs.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-gray-200/40 transition-colors"
                >
                  {/* Job ID */}
                  <td className="py-4 px-5 sm:px-6 text-sm font-bold text-[#5B1B95] whitespace-nowrap">
                    {job.id}
                  </td>

                  {/* Property Name & Client */}
                  <td className="py-4 px-5 sm:px-6">
                    <div className="text-sm font-bold text-gray-900 leading-tight">
                      {job.propertyName}
                    </div>
                    <div className="text-xs text-gray-400 font-normal mt-0.5">
                      {job.clientName}
                    </div>
                  </td>

                  {/* Service Request */}
                  <td className="py-4 px-5 sm:px-6 text-sm font-normal text-gray-600 whitespace-nowrap">
                    {job.serviceRequest}
                  </td>

                  {/* Task Level */}
                  <td className="py-4 px-5 sm:px-6 whitespace-nowrap">
                    {getTaskLevelBadge(job.taskLevel)}
                  </td>

                  {/* Assigned Date */}
                  <td className="py-4 px-5 sm:px-6 text-sm font-normal text-gray-500 whitespace-nowrap">
                    {job.assignedDate}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-5 sm:px-6 whitespace-nowrap">
                    {getStatusBadge(job.status)}
                  </td>

                  {/* Actions Button */}
                  <td className="py-4 px-5 sm:px-6 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedJob(job)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 rounded-xl transition-all shadow-2xs cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-gray-500" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}

              {filteredJobs.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center text-sm text-gray-500 font-normal"
                  >
                    No job requests matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* JOB DETAILS MODAL (Matching Screenshot 2) */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-[#F9FAFB] rounded-2xl p-6 sm:p-7 sm:max-w-2xl w-full shadow-2xl relative max-h-[92vh] overflow-y-auto space-y-3.5 border border-gray-300/60 no-scrollbar animate-in zoom-in-95 duration-200">
            {/* Top Close Button & Job Tag Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-gray-400 tracking-wider block">
                  {selectedJob.id}
                </span>
                <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                  {selectedJob.propertyName}
                </h2>
                <p className="text-xs text-gray-500 font-normal mt-0.5">
                  Posted By: {selectedJob.postedBy}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pending Acceptance Pill Tag */}
            <div>
              <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-[#FEF3C7] text-[#D97706] inline-block">
                Pending Acceptance
              </span>
            </div>

            {/* Grid 1: Job Type & Priority Level */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-200/50 border border-gray-300/50 rounded-xl p-3.5">
                <span className="text-xs text-gray-400 font-normal block">
                  Job Type
                </span>
                <span className="text-sm font-bold text-gray-900 mt-1 block">
                  {selectedJob.serviceRequest}
                </span>
              </div>

              <div className="bg-gray-200/50 border border-gray-300/50 rounded-xl p-3.5">
                <span className="text-xs text-gray-400 font-normal block">
                  Priority Level
                </span>
                <span className="text-sm font-bold text-gray-900 mt-1 block">
                  {selectedJob.id === "JOB-008" ? "High" : selectedJob.taskLevel}
                </span>
              </div>
            </div>

            {/* Grid 2: Payout & Property */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-200/50 border border-gray-300/50 rounded-xl p-3.5">
                <span className="text-xs text-gray-400 font-normal block">
                  Payout
                </span>
                <span className="text-sm font-bold text-gray-900 mt-1 block">
                  {selectedJob.payout}
                </span>
              </div>

              <div className="bg-gray-200/50 border border-gray-300/50 rounded-xl p-3.5">
                <span className="text-xs text-gray-400 font-normal block">
                  Property
                </span>
                <span className="text-sm font-bold text-gray-900 mt-1 block truncate">
                  {selectedJob.propertyName}
                </span>
              </div>
            </div>

            {/* Grid 3: Unit & Scheduled Date */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-200/50 border border-gray-300/50 rounded-xl p-3.5">
                <span className="text-xs text-gray-400 font-normal block">
                  Unit
                </span>
                <span className="text-sm font-bold text-gray-900 mt-1 block">
                  {selectedJob.unit}
                </span>
              </div>

              <div className="bg-gray-200/50 border border-gray-300/50 rounded-xl p-3.5">
                <span className="text-xs text-gray-400 font-normal block">
                  Scheduled Date
                </span>
                <span className="text-sm font-bold text-gray-900 mt-1 block leading-tight">
                  {selectedJob.scheduledDate}
                </span>
              </div>
            </div>

            {/* Address Row */}
            <div className="bg-gray-200/50 border border-gray-300/50 rounded-xl p-3.5">
              <span className="text-xs text-gray-400 font-normal block">
                Address
              </span>
              <div className="flex items-center gap-1.5 text-sm font-bold text-gray-900 mt-1">
                <MapPin className="w-4 h-4 text-[#5B1B95] shrink-0" />
                <span>{selectedJob.address}</span>
              </div>
            </div>

            {/* Job Scope Description Row */}
            <div className="bg-gray-200/50 border border-gray-300/50 rounded-xl p-3.5">
              <span className="text-xs text-gray-400 font-normal block">
                Job Scope Description
              </span>
              <p className="text-xs text-gray-800 font-normal mt-1 leading-relaxed">
                {selectedJob.scopeDescription}
              </p>
            </div>

            {/* Notes Row */}
            <div className="bg-gray-200/50 border border-gray-300/50 rounded-xl p-3.5">
              <span className="text-xs text-gray-400 font-normal block">
                Notes
              </span>
              <p className="text-xs text-gray-800 font-normal mt-1">
                {selectedJob.notes}
              </p>
            </div>

            {/* Images Grid */}
            {selectedJob.images && selectedJob.images.length > 0 && (
              <div className="bg-gray-200/50 border border-gray-300/50 rounded-xl p-3.5">
                <span className="text-xs text-gray-400 font-normal block mb-2">
                  Images
                </span>
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                  {selectedJob.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Job detail ${idx + 1}`}
                      className="w-24 h-16 object-cover rounded-xl border border-gray-300/60 shadow-2xs shrink-0"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Red Alert Banner */}
            <div className="bg-red-50/90 border border-red-300/80 rounded-xl p-3.5 flex items-start gap-2 text-xs text-[#E53935]">
              <Clock className="w-4 h-4 text-[#E53935] shrink-0 mt-0.5" />
              <span className="font-normal leading-tight">
                60 minutes to accept or decline this job before it&apos;s assigned to
                the next Service Pro.
              </span>
            </div>

            {/* Bottom Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleAcceptJob(selectedJob.id)}
                className="flex-1 bg-[#5B1B95] hover:bg-[#4a157a] text-white font-semibold py-3 px-4 rounded-xl text-sm transition-colors cursor-pointer shadow-xs text-center"
              >
                Accept
              </button>

              <button
                type="button"
                onClick={() => handleDeclineJob(selectedJob.id)}
                className="flex-1 bg-[#EBEBEB] hover:bg-gray-300/80 text-gray-800 font-semibold py-3 px-4 rounded-xl text-sm transition-colors cursor-pointer text-center"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
