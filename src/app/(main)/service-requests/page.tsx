"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import { ServiceRequest, StatusType, PriorityType } from "@/types/serviceRequest";
import ServiceRequestHeader from "@/components/service-requests/ServiceRequestHeader";
import ServiceRequestStats from "@/components/service-requests/ServiceRequestStats";
import ServiceRequestTable from "@/components/service-requests/ServiceRequestTable";
import CreateServiceRequestModal from "@/components/service-requests/CreateServiceRequestModal";
import {
  getStoredRequests,
  subscribeToRequests,
  createServiceRequest,
  ServiceRequestItem,
} from "@/types/serviceRequestStore";

export default function ServiceRequestsPage() {
  const router = useRouter();
  const [storeRequests, setStoreRequests] = useState<ServiceRequestItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setStoreRequests(getStoredRequests());
    const unsubscribe = subscribeToRequests((updated) => {
      setStoreRequests(updated);
    });
    return () => unsubscribe();
  }, []);

  // Map ServiceRequestItem from store to legacy ServiceRequest format for rendering
  const mappedRequests: ServiceRequest[] = storeRequests.map((r) => ({
    id: r.id,
    title: r.issue,
    property: r.property,
    address: r.address,
    priority: (r.priority === "Critical" ? "Urgent" : r.priority) as PriorityType,
    status: (r.status === "Reassignment Requested" ? "Pending" : r.status) as StatusType,
    stage: r.status === "Completed" ? 4 : r.status === "In Progress" || r.status === "Accepted" ? 3 : r.status === "Assigned" ? 2 : 1,
    stageText: r.status === "Completed" ? "Completed" : r.status === "In Progress" || r.status === "Accepted" ? "In Progress" : r.status === "Assigned" ? "Assigned" : "Pending Approval",
    contractor: r.contractor,
    contractorPhone: r.contractorPhone || "+1 (555) 000-0000",
    createdDate: r.date,
    isOccupied: true,
    tenantName: r.tenantName || "Nichole",
    tenantPhone: r.tenantPhone || "+1 (555) 255-2552",
  }));

  // Counts
  const pendingCount = mappedRequests.filter((r) => r.status === "Pending").length;
  const assignedCount = mappedRequests.filter((r) => r.status === "Assigned").length;
  const inProgressCount = mappedRequests.filter((r) => r.status === "In Progress" || (r.status as string) === "Accepted").length;
  const completedCount = mappedRequests.filter((r) => r.status === "Completed").length;
  const cancelledCount = mappedRequests.filter((r) => r.status === "Cancelled").length;

  // Filtered Requests
  const filteredRequests = mappedRequests.filter((r) => {
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
    _newStatus: StatusType,
    _newStage: number,
    _stageText: string
  ) => {
    toast.success(`Request ${id} status updated`);
  };

  // Submit Modal - Creates a Service Request that routes to Super Admin
  const handleCreateSubmit = (newReq: ServiceRequest) => {
    const created = createServiceRequest({
      propertyManager: "Alex Johnson (Property Manager)",
      property: newReq.property,
      address: newReq.address,
      issue: newReq.title,
      type: "Plumbing",
      priority: (newReq.priority === "Urgent" ? "Critical" : newReq.priority) as "Critical" | "High" | "Medium" | "Low",
      tenantName: newReq.tenantName,
      tenantPhone: newReq.tenantPhone,
      notes: "Newly created service request from Property Manager.",
    });

    toast.success(`New Service Request ${created.id} submitted! Sent to Super Admin for review.`);
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
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-3.5 sm:p-2">
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
        totalRequestsCount={storeRequests.length}
      />
    </div>
  );
}