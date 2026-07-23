"use client";

import {
  ExternalLink,
  Plus,
  Search,
  UploadCloud,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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

const initialRequests: ServiceRequest[] = [
  {
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
  {
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
  {
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
  {
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
  {
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
  {
    id: "SR-006",
    title: "Window Seal Replacement",
    property: "Pine Ridge Townhomes",
    address: "888 Pine Ridge Ave, Denver, CO 80201",
    priority: "Medium",
    status: "Pending",
    stage: 1,
    stageText: "Stage 1: Started",
    contractor: "Unassigned",
    createdDate: "Jun 25, 2026",
  },
  {
    id: "SR-007",
    title: "Roof Gutter Cleaning",
    property: "Sunset Apartments",
    address: "123 Sunset Blvd, Los Angeles, CA 90028",
    priority: "Medium",
    status: "Pending",
    stage: 1,
    stageText: "Stage 1: Started",
    contractor: "Unassigned",
    createdDate: "Jun 24, 2026",
  },
];

export default function ServiceRequestsPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<ServiceRequest[]>(initialRequests);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formProperty, setFormProperty] = useState<string>("Sunset Apartments");
  const [formTitle, setFormTitle] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");
  const [formPriority, setFormPriority] = useState<PriorityType>("Medium");
  const [formIsOccupied, setFormIsOccupied] = useState<boolean>(false);
  const [formTenantName, setFormTenantName] = useState<string>("");
  const [formTenantPhone, setFormTenantPhone] = useState<string>("");
  const [formExtraTitle, setFormExtraTitle] = useState<string>("");

  // Counts for Top Cards
  const pendingCount = requests.filter((r) => r.status === "Pending").length;
  const assignedCount = requests.filter((r) => r.status === "Assigned").length;
  const inProgressCount = requests.filter((r) => r.status === "In Progress").length;
  const completedCount = requests.filter((r) => r.status === "Completed").length;
  const cancelledCount = requests.filter((r) => r.status === "Cancelled").length;

  // Filtered Requests
  const filteredRequests = requests.filter((r) => {
    const query = searchTerm.toLowerCase();
    return (
      r.id.toLowerCase().includes(query) ||
      r.title.toLowerCase().includes(query) ||
      r.property.toLowerCase().includes(query) ||
      r.contractor.toLowerCase().includes(query)
    );
  });

  // Action status changes
  const handleStatusChange = (id: string, newStatus: StatusType, newStage: number, stageText: string) => {
    setRequests(
      requests.map((r) =>
        r.id === id ? { ...r, status: newStatus, stage: newStage, stageText } : r
      )
    );
    toast.success(`Request ${id} updated to ${newStatus}`);
  };

  // Submit Modal
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      toast.error("Request title is required");
      return;
    }

    const newId = `SR-00${requests.length + 1}`;
    const newReq: ServiceRequest = {
      id: newId,
      title: formTitle,
      property: formProperty,
      address: "123 Sunset Blvd, Los Angeles, CA 90028",
      priority: formPriority,
      status: "Pending",
      stage: 1,
      stageText: "Stage 1: Started",
      contractor: "Unassigned",
      createdDate: "Jun 26, 2026",
      isOccupied: formIsOccupied,
      tenantName: formIsOccupied ? formTenantName : undefined,
      tenantPhone: formIsOccupied ? formTenantPhone : undefined,
    };

    setRequests([newReq, ...requests]);
    toast.success(`New Service Request ${newId} created!`);
    setIsModalOpen(false);
    // Reset Form
    setFormTitle("");
    setFormDescription("");
    setFormPriority("Medium");
    setFormIsOccupied(false);
    setFormTenantName("");
    setFormTenantPhone("");
    setFormExtraTitle("");
  };

  // Navigate to Track Page
  const navigateToTrack = (id: string) => {
    router.push(`/service-requests/track?id=${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Service Requests
          </h1>
          <p className="text-sm text-gray-500 font-normal mt-1">
            {filteredRequests.length} active · Click a Job ID to track progress
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2 text-sm w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>New Service Request</span>
        </button>
      </div>

      {/* 5 Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Pending */}
        <div className="bg-[#E2E2E5] border border-gray-300/50 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-2xl font-bold text-[#FF9F00]">{pendingCount}</span>
          <span className="text-xs font-medium text-gray-500 mt-1">Pending</span>
        </div>

        {/* Assigned */}
        <div className="bg-[#E2E2E5] border border-gray-300/50 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-2xl font-bold text-[#2563EB]">{assignedCount}</span>
          <span className="text-xs font-medium text-gray-500 mt-1">Assigned</span>
        </div>

        {/* In Progress */}
        <div className="bg-[#E2E2E5] border border-gray-300/50 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-2xl font-bold text-[#8E25E3]">{inProgressCount}</span>
          <span className="text-xs font-medium text-gray-500 mt-1">In Progress</span>
        </div>

        {/* Completed */}
        <div className="bg-[#E2E2E5] border border-gray-300/50 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-2xl font-bold text-[#16A34A]">{completedCount}</span>
          <span className="text-xs font-medium text-gray-500 mt-1">Completed</span>
        </div>

        {/* Cancelled */}
        <div className="bg-[#E2E2E5] border border-gray-300/50 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-2xl font-bold text-[#DC2626]">{cancelledCount}</span>
          <span className="text-xs font-medium text-gray-500 mt-1">Cancelled</span>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="bg-[#E2E2E5] border border-gray-300/50 rounded-2xl p-3.5 sm:p-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, title, or property..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#EAEAEA] border border-transparent rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Main Requests Table Container */}
      <div className="bg-[#E2E2E5] border border-gray-300/50 rounded-2xl overflow-x-auto shadow-xs">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-gray-300/60 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              <th className="py-4 px-5">JOB ID</th>
              <th className="py-4 px-5">PROPERTY NAME</th>
              <th className="py-4 px-5">PRIORITY</th>
              <th className="py-4 px-5">STATUS</th>
              <th className="py-4 px-5">PROGRESS</th>
              <th className="py-4 px-5">CONTRACTOR</th>
              <th className="py-4 px-5">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300/40 text-sm">
            {filteredRequests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-200/50 transition-colors">
                {/* JOB ID */}
                <td className="py-4 px-5 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => navigateToTrack(req.id)}
                    className="bg-[#F2E7FC] hover:bg-purple-200 text-[#8E25E3] font-bold text-xs px-3 py-1.5 rounded-lg inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>{req.id}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </td>

                {/* PROPERTY NAME */}
                <td className="py-4 px-5">
                  <div className="font-bold text-gray-900">{req.title}</div>
                  <div className="text-xs text-gray-500 font-normal mt-0.5">{req.property}</div>
                </td>

                {/* PRIORITY */}
                <td className="py-4 px-5 whitespace-nowrap">
                  <span
                    className={`font-semibold text-xs px-3 py-1 rounded-full ${
                      req.priority === "Urgent"
                        ? "bg-red-100 text-red-600"
                        : req.priority === "High"
                        ? "bg-amber-100 text-amber-700"
                        : req.priority === "Medium"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {req.priority}
                  </span>
                </td>

                {/* STATUS */}
                <td className="py-4 px-5 whitespace-nowrap">
                  <span
                    className={`font-semibold text-xs px-3 py-1 rounded-full ${
                      req.status === "In Progress"
                        ? "bg-purple-100 text-purple-700"
                        : req.status === "Assigned"
                        ? "bg-blue-100 text-blue-700"
                        : req.status === "Completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : req.status === "Pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>

                {/* PROGRESS BAR & STAGE */}
                <td className="py-4 px-5 whitespace-nowrap">
                  <div className="flex items-center gap-1 mb-1">
                    <div
                      className={`h-1.5 w-5 rounded-full ${
                        req.stage >= 1 ? "bg-emerald-500" : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`h-1.5 w-5 rounded-full ${
                        req.stage >= 2 ? "bg-emerald-500" : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`h-1.5 w-5 rounded-full ${
                        req.stage >= 3 ? "bg-[#8E25E3]" : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`h-1.5 w-5 rounded-full ${
                        req.stage >= 4 ? "bg-emerald-500" : "bg-gray-300"
                      }`}
                    />
                  </div>
                  <span className="text-[11px] text-gray-500 font-normal">
                    {req.stageText}
                  </span>
                </td>

                {/* CONTRACTOR */}
                <td className="py-4 px-5 whitespace-nowrap text-xs font-medium text-gray-700">
                  {req.contractor}
                </td>

                {/* ACTIONS BUTTONS */}
                <td className="py-4 px-5 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {req.status === "In Progress" && (
                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(req.id, "Completed", 4, "Completed")
                        }
                        className="border border-emerald-400 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold px-3 py-1 rounded-lg text-xs cursor-pointer transition-colors"
                      >
                        Complete
                      </button>
                    )}
                    {req.status === "Assigned" && (
                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(req.id, "In Progress", 3, "Stage 3: In Progress")
                        }
                        className="border border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold px-3 py-1 rounded-lg text-xs cursor-pointer transition-colors"
                      >
                        Start
                      </button>
                    )}
                    {req.status === "Pending" && (
                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(req.id, "Assigned", 2, "Stage 2: Supplies")
                        }
                        className="border border-purple-400 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold px-3 py-1 rounded-lg text-xs cursor-pointer transition-colors"
                      >
                        Assign
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => navigateToTrack(req.id)}
                      className="border border-gray-300 bg-white/80 hover:bg-white text-gray-700 font-medium px-3 py-1 rounded-lg text-xs cursor-pointer transition-colors"
                    >
                      Track
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* NEW SERVICE REQUEST MODAL DIALOG */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#EBEBEB] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl max-h-[92vh] overflow-y-auto border border-gray-300/60">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">New Service Request</h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              {/* Select Property (shadcn Select) */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Select Property *
                </label>
                <Select value={formProperty} onValueChange={(val) => setFormProperty(val)}>
                  <SelectTrigger className="w-full h-[46px] px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none transition-all cursor-pointer shadow-none">
                    <SelectValue placeholder="Select Property" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-xl border border-gray-200 shadow-lg z-[60]">
                    <SelectItem value="Sunset Apartments">Sunset Apartments</SelectItem>
                    <SelectItem value="Green Valley Complex">Green Valley Complex</SelectItem>
                    <SelectItem value="TechHub Tower">TechHub Tower</SelectItem>
                    <SelectItem value="Maple Street Condos">Maple Street Condos</SelectItem>
                    <SelectItem value="Harbor View Plaza">Harbor View Plaza</SelectItem>
                    <SelectItem value="Pine Ridge Townhomes">Pine Ridge Townhomes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Request Title */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Request Title *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Where is the issue? Example- Leaking pipe in kitchen"
                  className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none transition-all"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Detailed description of the issue..."
                  className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Priority Level Pills */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Priority Level *
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(["Urgent", "High", "Medium", "Low"] as PriorityType[]).map((pri) => (
                    <button
                      key={pri}
                      type="button"
                      onClick={() => setFormPriority(pri)}
                      className={`py-2.5 px-2 rounded-xl font-medium text-xs sm:text-sm text-center cursor-pointer transition-all ${
                        formPriority === pri
                          ? "border-2 border-[#6B1294] bg-[#F2E7FC] text-[#6B1294] font-bold"
                          : "bg-[#E2E2E5] text-gray-700 border border-transparent hover:bg-gray-300"
                      }`}
                    >
                      {pri}
                    </button>
                  ))}
                </div>
              </div>

              {/* Is unit/ property occupied? (Yes / No Pills) */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Is unit/ property occupied? *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormIsOccupied(true)}
                    className={`py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center cursor-pointer transition-all ${
                      formIsOccupied
                        ? "border-2 border-emerald-500 bg-emerald-100 text-emerald-800"
                        : "bg-[#E2E2E5] text-gray-700 border border-transparent hover:bg-gray-300"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormIsOccupied(false)}
                    className={`py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center cursor-pointer transition-all ${
                      !formIsOccupied
                        ? "border-2 border-red-300 bg-red-100 text-red-700"
                        : "bg-[#E2E2E5] text-gray-700 border border-transparent hover:bg-gray-300"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* DYNAMIC CONDITION: EXPAND TENANT FIELDS WHEN OCCUPIED IS YES */}
              {formIsOccupied && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                        Tenant Name *
                      </label>
                      <input
                        type="text"
                        value={formTenantName}
                        onChange={(e) => setFormTenantName(e.target.value)}
                        placeholder="Nichole"
                        className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="text"
                        value={formTenantPhone}
                        onChange={(e) => setFormTenantPhone(e.target.value)}
                        placeholder="+555 2552 552"
                        className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                      Request Title *
                    </label>
                    <input
                      type="text"
                      value={formExtraTitle}
                      onChange={(e) => setFormExtraTitle(e.target.value)}
                      placeholder="Where is the issue? Example- Leaking pipe in kitchen"
                      className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                </>
              )}

              {/* Drag & Drop Photo Upload */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Upload Photos
                </label>
                <div className="border-2 border-dashed border-gray-300/80 bg-[#E2E2E5]/60 hover:bg-white rounded-xl p-5 text-center cursor-pointer transition-all">
                  <UploadCloud className="w-7 h-7 text-gray-400 mx-auto mb-1.5" />
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">
                    Drag & drop photos here, or{" "}
                    <span className="text-[#6B1294] font-semibold underline">
                      browse
                    </span>
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    PNG, JPG up to 3 images
                  </p>
                </div>
              </div>

              {/* Submit / Cancel Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3.5 px-4 bg-[#E2E2E5] hover:bg-gray-300 border border-gray-300/60 rounded-xl text-gray-800 font-semibold text-sm sm:text-base transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-4 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold rounded-xl shadow-sm text-sm sm:text-base transition-colors cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}