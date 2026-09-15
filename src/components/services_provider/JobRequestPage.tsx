"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  Eye,
  X,
  MapPin,
  Plus,
  Wrench,
  AlertTriangle,
  Play,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getStoredRequests,
  subscribeToRequests,
  acceptServiceRequest,
  declineServiceRequest,
  createExtraWorkRequest,
  startExtraWorkRequest,
  ServiceRequestItem,
} from "@/types/serviceRequestStore";
import DeclineJobModal from "./DeclineJobModal";
import CreateExtraWorkModal from "./CreateExtraWorkModal";

export default function JobRequestPage(): React.ReactElement {
  const [requests, setRequests] = useState<ServiceRequestItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedJob, setSelectedJob] = useState<ServiceRequestItem | null>(null);

  // Modals
  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [declineJobTargetId, setDeclineJobTargetId] = useState("");

  const [extraWorkModalOpen, setExtraWorkModalOpen] = useState(false);
  const [extraWorkJobTarget, setExtraWorkJobTarget] = useState<ServiceRequestItem | null>(null);

  useEffect(() => {
    setRequests(getStoredRequests());
    const unsubscribe = subscribeToRequests((updated) => {
      setRequests(updated);
    });
    return () => unsubscribe();
  }, []);

  // Sync selectedJob when store updates
  useEffect(() => {
    if (selectedJob) {
      const match = requests.find((r) => r.id === selectedJob.id);
      if (match) setSelectedJob(match);
    }
  }, [requests, selectedJob]);

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return requests.filter((job) => {
      const matchesSearch =
        job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.contractor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Pending" && job.status === "Assigned") ||
        (statusFilter === "In Progress" && (job.status === "In Progress" || job.status === "Accepted")) ||
        (statusFilter === "Completed" && job.status === "Completed") ||
        (statusFilter === "Cancelled" && (job.status === "Cancelled" || job.status === "Reassignment Requested"));

      return matchesSearch && matchesStatus;
    });
  }, [requests, searchTerm, statusFilter]);

  const handleAcceptJob = (jobId: string) => {
    acceptServiceRequest(jobId);
    toast.success(`Job ${jobId} accepted! Status updated on Property Manager's Track Project page.`);
    setSelectedJob(null);
  };

  const handleOpenDeclineModal = (jobId: string) => {
    setDeclineJobTargetId(jobId);
    setDeclineModalOpen(true);
  };

  const handleSubmitDeclineReason = (reason: string) => {
    declineServiceRequest(declineJobTargetId, reason);
    toast.error(`Job ${declineJobTargetId} declined. Submitted to Super Admin for reassignment.`);
    setDeclineModalOpen(false);
    setSelectedJob(null);
  };

  const handleOpenExtraWorkModal = (job: ServiceRequestItem) => {
    setExtraWorkJobTarget(job);
    setExtraWorkModalOpen(true);
  };

  const handleSubmitExtraWork = (extraData: {
    extraServiceName: string;
    description: string;
    images: string[];
    additionalFee: number;
    requestedBy: string;
  }) => {
    if (!extraWorkJobTarget) return;
    createExtraWorkRequest(extraWorkJobTarget.id, extraData);
    toast.success(`Extra Work Request submitted for ${extraWorkJobTarget.id}! Sent to Property Manager for approval.`);
    setExtraWorkModalOpen(false);
  };

  const handleStartExtraWork = (parentReqId: string, extraWorkId: string) => {
    startExtraWorkRequest(parentReqId, extraWorkId);
    toast.success(`Extra Work ${extraWorkId} started! Status changed to In Progress.`);
  };

  // Helper for Task Level Badge
  const getTaskLevelBadge = (level: string) => {
    switch (level) {
      case "Critical":
      case "Urgent":
      case "High":
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-800">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            High
          </span>
        );
      case "Medium":
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-800">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Medium
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Low
          </span>
        );
    }
  };

  // Helper for Status Badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Assigned":
        return (
          <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-amber-100/90 text-amber-800 border border-amber-200/60 inline-block">
            Pending Acceptance
          </span>
        );
      case "Accepted":
      case "In Progress":
        return (
          <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-blue-100/90 text-blue-700 border border-blue-200/60 inline-block">
            In Progress
          </span>
        );
      case "Completed":
        return (
          <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-emerald-100/90 text-emerald-800 border border-emerald-200/60 inline-block">
            Completed
          </span>
        );
      case "Reassignment Requested":
      case "Declined":
        return (
          <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-red-100/90 text-red-700 border border-red-200/60 inline-block">
            Reassignment Requested
          </span>
        );
      default:
        return (
          <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-200 inline-block">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Job Requests & Work Orders
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5 sm:mt-1">
          Review assigned requests, accept/decline jobs, and submit Extra Work requests to Property Managers.
        </p>
      </div>

      {/* Top Search & Filter Bar */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, property, service..."
            className="w-full bg-gray-100/80 border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#8E25E3] transition-all"
          />
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] h-9 bg-gray-100/80 py-5 border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:ring-0 focus:border-[#8E25E3]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 rounded-lg shadow-lg">
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending Acceptance</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Reassigned / Declined</SelectItem>
            </SelectContent>
          </Select>

          <span className="text-xs text-gray-500 font-medium ml-1">
            {filteredJobs.length} results
          </span>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-5 sm:px-6">Job ID</th>
                <th className="py-4 px-5 sm:px-6">Property & PM</th>
                <th className="py-4 px-5 sm:px-6">Service Request</th>
                <th className="py-4 px-5 sm:px-6">Priority</th>
                <th className="py-4 px-5 sm:px-6">Payout</th>
                <th className="py-4 px-5 sm:px-6">Status</th>
                <th className="py-4 px-5 sm:px-6 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-purple-50/20 transition-colors">
                  <td className="py-4 px-5 sm:px-6 text-sm font-bold text-[#8E25E3] whitespace-nowrap">
                    {job.id}
                  </td>
                  <td className="py-4 px-5 sm:px-6">
                    <div className="text-sm font-bold text-gray-900 leading-tight">
                      {job.property}
                    </div>
                    <div className="text-xs text-gray-400 font-normal mt-0.5">
                      PM: {job.propertyManager}
                    </div>
                  </td>
                  <td className="py-4 px-5 sm:px-6 text-sm font-medium text-gray-700">
                    {job.issue}
                  </td>
                  <td className="py-4 px-5 sm:px-6 whitespace-nowrap">
                    {getTaskLevelBadge(job.priority)}
                  </td>
                  <td className="py-4 px-5 sm:px-6 text-sm font-bold text-gray-900 whitespace-nowrap">
                    ${job.finalPayCalculated || (job.basePay + (job.additionalFee || 0))}
                  </td>
                  <td className="py-4 px-5 sm:px-6 whitespace-nowrap">
                    {getStatusBadge(job.status)}
                  </td>
                  <td className="py-4 px-5 sm:px-6 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedJob(job)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#6B1294] bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-all shadow-2xs cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review Details</span>
                    </button>
                  </td>
                </tr>
              ))}

              {filteredJobs.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-gray-500 font-normal">
                    No job requests matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* JOB DETAILS MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-7 sm:max-w-2xl w-full shadow-2xl relative max-h-[92vh] overflow-y-auto space-y-4 border border-[#E5E7EB] custom-scrollbar animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-bold text-purple-700 tracking-wider block">
                  Job #{selectedJob.id}
                </span>
                <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                  {selectedJob.property}
                </h2>
                <p className="text-xs text-gray-500 font-normal mt-0.5">
                  Property Manager: <span className="font-semibold text-gray-800">{selectedJob.propertyManager}</span>
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

            {/* Status Banner */}
            <div className="flex items-center justify-between">
              {getStatusBadge(selectedJob.status)}
              <span className="text-xs text-gray-500 font-semibold">
                Scheduled: {selectedJob.etaDate}
              </span>
            </div>

            {/* Grid 1: Job Type & Priority */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Service Category</span>
                <span className="text-sm font-bold text-gray-900 mt-0.5 block">{selectedJob.type}</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Priority Level</span>
                <span className="text-sm font-bold text-gray-900 mt-0.5 block">{selectedJob.priority}</span>
              </div>
            </div>

            {/* Grid 2: Payout Breakdown */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Base Price</span>
                <span className="text-sm font-bold text-gray-900 mt-0.5 block">${selectedJob.basePay}</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Custom Fee</span>
                <span className="text-sm font-bold text-gray-900 mt-0.5 block">${selectedJob.additionalFee || 0}</span>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <span className="text-[10px] font-bold text-[#6B1294] uppercase">Total Payout</span>
                <span className="text-base font-medium text-[#6B1294] mt-0.5 block">
                  ${selectedJob.finalPayCalculated || (selectedJob.basePay + (selectedJob.additionalFee || 0))}
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Job Site Address</span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 mt-1">
                <MapPin className="w-4 h-4 text-[#6B1294] shrink-0" />
                <span>{selectedJob.address}</span>
              </div>
            </div>

            {/* Main Issue / Scope Description */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Main Job Issue & Description</span>
              <p className="text-xs text-gray-800 font-normal mt-1 leading-relaxed">{selectedJob.issue}</p>
              {selectedJob.notes && (
                <p className="text-xs text-gray-500 font-normal mt-1 italic">Notes: {selectedJob.notes}</p>
              )}
            </div>

            {/* Extra Work Requests Section inside Modal */}
            <div className="border border-purple-200 bg-purple-50/20 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#6B1294]" />
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Extra Work Requests ({selectedJob.extraWorkRequests?.length || 0})
                  </h3>
                </div>
                {(selectedJob.status === "In Progress" || selectedJob.status === "Accepted") && (
                  <button
                    type="button"
                    onClick={() => handleOpenExtraWorkModal(selectedJob)}
                    className="px-3 py-1.5 bg-[#6B1294] hover:bg-[#580e7a] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Request Extra Work</span>
                  </button>
                )}
              </div>

              {selectedJob.extraWorkRequests && selectedJob.extraWorkRequests.length > 0 ? (
                <div className="space-y-2.5">
                  {selectedJob.extraWorkRequests.map((ew) => (
                    <div key={ew.id} className="bg-white border border-gray-200 rounded-lg p-3 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">{ew.extraServiceName}</span>
                        {ew.approvalStatus === "Approved" ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                            Approved by PM (${ew.additionalFee})
                          </span>
                        ) : ew.approvalStatus === "Declined" ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-800">
                            Declined by PM
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                            Pending PM Approval
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 font-normal">{ew.description}</p>

                      {/* Separate State: Start Extra Work once Approved */}
                      {ew.approvalStatus === "Approved" && (
                        <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                          <span className="text-[11px] text-gray-500">
                            Work Status: <strong className="text-emerald-700">{ew.workStatus || "Approved"}</strong>
                          </span>
                          {ew.workStatus !== "In Progress" && ew.workStatus !== "Completed" && (
                            <button
                              type="button"
                              onClick={() => handleStartExtraWork(selectedJob.id, ew.id)}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Play className="w-3 h-3" />
                              <span>Start Extra Work</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 font-normal italic">
                  No extra work requested yet. If Property Manager requests additional tasks on-site, click above to submit an Extra Work Request.
                </p>
              )}
            </div>

            {/* Decline Reason Banner if previously declined */}
            {selectedJob.declineReason && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-800 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Previous Decline Record:</span>
                </div>
                <p className="font-normal">{selectedJob.declineReason}</p>
              </div>
            )}

            {/* Bottom Action Buttons */}
            {selectedJob.status === "Assigned" && (
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleAcceptJob(selectedJob.id)}
                  className="flex-1 bg-[#6B1294] hover:bg-[#580e7a] text-white font-semibold py-3 px-4 rounded-lg text-sm transition-colors cursor-pointer text-center shadow-xs"
                >
                  Accept Job
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenDeclineModal(selectedJob.id)}
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 font-semibold py-3 px-4 rounded-lg text-sm transition-colors cursor-pointer text-center border border-red-200"
                >
                  Decline Job
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Decline Modal */}
      <DeclineJobModal
        isOpen={declineModalOpen}
        jobId={declineJobTargetId}
        onClose={() => setDeclineModalOpen(false)}
        onSubmitDecline={handleSubmitDeclineReason}
      />

      {/* Create Extra Work Modal */}
      {extraWorkJobTarget && (
        <CreateExtraWorkModal
          isOpen={extraWorkModalOpen}
          parentJobId={extraWorkJobTarget.id}
          parentJobTitle={extraWorkJobTarget.issue}
          onClose={() => setExtraWorkModalOpen(false)}
          onSubmitExtraWork={handleSubmitExtraWork}
        />
      )}
    </div>
  );
}
