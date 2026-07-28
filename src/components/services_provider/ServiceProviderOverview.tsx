"use client";

import React from "react";
import Link from "next/link";
import {
  Wrench,
  Clock,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  MapPin,
} from "lucide-react";

export default function ServiceProviderOverview(): React.ReactElement {
  // Mock statistics data matching the requested design
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

  // Mock job requests list matching screenshot
  const jobRequests = [
    {
      id: "JOB-001",
      priority: "HIGH",
      title: "Maple Heights Apt",
      category: "Plumbing Repair",
      status: "In Progress",
      statusStyle: "bg-[#BFDBFE] text-[#1E40AF]",
      priorityColor: "text-[#E53935]",
    },
    {
      id: "JOB-002",
      priority: "MEDIUM",
      title: "Riverside Condos",
      category: "Electrical Inspection",
      status: "Pending",
      statusStyle: "bg-yellow-100 text-yellow-600",
      priorityColor: "text-[#D97706]",
    },
    {
      id: "JOB-004",
      priority: "HIGH",
      title: "Sunset Gardens",
      category: "Roof Inspection",
      status: "Pending",
      statusStyle: "bg-yellow-100 text-yellow-600",
      priorityColor: "text-[#E53935]",
    },
    {
      id: "JOB-006",
      priority: "HIGH",
      title: "Harbor View Lofts",
      category: "Flooring Installation",
      status: "In Progress",
      statusStyle: "bg-[#BFDBFE] text-[#1E40AF]",
      priorityColor: "text-[#E53935]",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 flex items-center gap-2">
          Hi, James 👋
        </h1>
        <p className="text-sm text-gray-600 font-medium mt-1">
          Welcome to your <span className="font-medium text-[#8E25E3]">ProjexPro</span> dashboard.
        </p>
        <p className="text-xs sm:text-sm text-gray-400 font-normal mt-2">
          Friday, June 26, 2026.
        </p>
      </div>

      {/* Top 4 Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat) => {
          const IconComp = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-[#F9FAFB] border border-gray-300/50 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div className="mt-4">
                  <h2 className="text-3xl font-medium text-gray-900 tracking-tight">
                    {stat.value}
                  </h2>
                  <p className="text-sm font-normal text-gray-500 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href={stat.href}
                  className={`text-xs font-medium underline decoration-solid underline-offset-2 ${stat.linkColor} hover:opacity-80 transition-opacity`}
                >
                  Click for Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left Column: Assigned Job Today */}
        <div className="lg:col-span-4 bg-[#F9FAFB] border border-gray-300/50 rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Assigned Job Today
            </h2>
            <p className="text-xs text-gray-500 font-normal mt-0.5 mb-6">
              You have 3 assigned job today
            </p>

            <div className="space-y-6 relative pl-1">
              {assignedJobsToday.map((job, idx) => (
                <div key={job.id} className="relative flex items-start gap-4">
                  {/* Timeline connector dot and line */}
                  <div className="flex flex-col items-center self-stretch pt-1">
                    <div
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${job.active
                        ? "bg-[#8E25E3] ring-4 ring-[#F0E6FC] "
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
                      <h3 className="text-sm font-medium text-gray-900 mt-1 leading-tight truncate">
                        {job.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-normal mt-0.5 leading-tight truncate">
                        {job.category}
                      </p>
                    </div>

                    <Link
                      href="/services_provider/job_request"
                      className="text-xs font-medium text-[#8E25E3] hover:underline flex items-center gap-1 shrink-0 ml-2"
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
        <div className="lg:col-span-8 bg-[#F9FAFB] border border-gray-300/50 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="text-lg font-medium text-gray-900">Job Request</h2>
            <Link
              href="/services_provider/job_request"
              className="text-xs font-medium text-[#8E25E3] hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Job Request Items List */}
          <div className="space-y-3">
            {jobRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white border border-gray-300/60 rounded-2xl p-4 sm:p-5 flex items-center justify-between transition-all hover:bg-gray-50"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-400 tracking-wider">
                      {req.id}
                    </span>
                    <span className={`text-xs font-medium ${req.priorityColor}`}>
                      {req.priority}
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-gray-900">
                    {req.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-normal">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{req.category}</span>
                  </div>
                </div>

                <div className="shrink-0 ml-4">
                  <span
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-full inline-block ${req.statusStyle}`}
                  >
                    {req.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
