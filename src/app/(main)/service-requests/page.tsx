"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import { ServiceRequest, StatusType } from "@/types/serviceRequest";
import ServiceRequestHeader from "@/components/service-requests/ServiceRequestHeader";
import ServiceRequestStats from "@/components/service-requests/ServiceRequestStats";
import ServiceRequestTable from "@/components/service-requests/ServiceRequestTable";
import CreateServiceRequestModal from "@/components/service-requests/CreateServiceRequestModal";

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Counts
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

  // Handle status update
  const handleStatusChange = (
    id: string,
    newStatus: StatusType,
    newStage: number,
    stageText: string
  ) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: newStatus, stage: newStage, stageText } : r
      )
    );
    toast.success(`Request ${id} updated to ${newStatus}`);
  };

  // Submit Modal
  const handleCreateSubmit = (newReq: ServiceRequest) => {
    setRequests([newReq, ...requests]);
    toast.success(`New Service Request ${newReq.id} created!`);
    setIsModalOpen(false);
  };

  // Navigate to Track
  const navigateToTrack = (id: string) => {
    router.push(`/service-requests/track?id=${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <ServiceRequestHeader
        activeCount={filteredRequests.length}
        onOpenModal={() => setIsModalOpen(true)}
      />

      {/* Stats Cards */}
      <ServiceRequestStats
        pendingCount={pendingCount}
        assignedCount={assignedCount}
        inProgressCount={inProgressCount}
        completedCount={completedCount}
        cancelledCount={cancelledCount}
      />

      {/* Search Input Bar */}
      <div className="bg-[#F9FAFB] border border-gray-300/50 rounded-lg p-3.5 sm:p-2">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, title, or property..."
            className="w-full pl-10 pr-4 py-3.5 bg-white border border-gray-300 rounded-sm text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <ServiceRequestTable
        requests={filteredRequests}
        onNavigateToTrack={navigateToTrack}
        onStatusChange={handleStatusChange}
      />

      {/* Create Modal */}
      <CreateServiceRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSubmit}
        totalRequestsCount={requests.length}
      />
    </div>
  );
}