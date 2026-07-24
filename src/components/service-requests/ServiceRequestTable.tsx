"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import { ServiceRequest, StatusType } from "@/types/serviceRequest";

interface ServiceRequestTableProps {
  requests: ServiceRequest[];
  onNavigateToTrack: (id: string) => void;
  onStatusChange: (id: string, newStatus: StatusType, newStage: number, stageText: string) => void;
}

export default function ServiceRequestTable({
  requests,
  onNavigateToTrack,
  onStatusChange,
}: ServiceRequestTableProps) {
  if (requests.length === 0) {
    return (
      <div className="bg-[#E2E2E5] border border-gray-300/50 rounded-2xl p-8 text-center">
        <p className="text-gray-500 font-medium text-sm">
          No service requests found matching your search.
        </p>
      </div>
    );
  }

  return (
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
          {requests.map((req) => (
            <tr key={req.id} className="hover:bg-gray-200/50 transition-colors">
              {/* JOB ID */}
              <td className="py-4 px-5 whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => onNavigateToTrack(req.id)}
                  className="bg-[#F2E7FC] hover:bg-purple-200 text-[#8E25E3] font-bold text-xs px-3 py-1.5 rounded-sm inline-flex items-center gap-1 cursor-pointer transition-colors"
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
                        onStatusChange(req.id, "Completed", 4, "Completed")
                      }
                      className="border border-emerald-400 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold px-3 py-2 rounded-sm text-xs cursor-pointer transition-colors"
                    >
                      Complete
                    </button>
                  )}
                  {req.status === "Assigned" && (
                    <button
                      type="button"
                      onClick={() =>
                        onStatusChange(req.id, "In Progress", 3, "Stage 3: In Progress")
                      }
                      className="border border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold px-3 py-2 rounded-sm text-xs cursor-pointer transition-colors"
                    >
                      Start
                    </button>
                  )}
                  {req.status === "Pending" && (
                    <button
                      type="button"
                      onClick={() =>
                        onStatusChange(req.id, "Assigned", 2, "Stage 2: Supplies")
                      }
                      className="border border-purple-400 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold px-3 py-2 rounded-sm text-xs cursor-pointer transition-colors"
                    >
                      Assign
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onNavigateToTrack(req.id)}
                    className="border border-gray-300 bg-white/80 hover:bg-white text-gray-700 font-medium px-3 py-2 rounded-sm text-xs cursor-pointer transition-colors"
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
  );
}
