"use client";

import React, { useState } from "react";
import { ArrowLeft, Building2, Check, Pencil, Send, User } from "lucide-react";
import { VerificationFormData } from "@/types/verification";
import toast from "react-hot-toast";

interface Step4ReviewSubmitProps {
  formData: VerificationFormData;
  onEditStep: (step: number) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export default function Step4ReviewSubmit({
  formData,
  onEditStep,
  onBack,
  onSubmit,
}: Step4ReviewSubmitProps) {
  const [isConfirmed, setIsConfirmed] = useState<boolean>(true);

  const handleSubmitClick = () => {
    if (!isConfirmed) {
      toast.error("Please confirm your information before submitting.");
      return;
    }
    onSubmit();
  };

  return (
    <div className="space-y-6 max-w-3xl animate-in fade-in duration-300">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#6B1294]">
          STEP 4 OF 4
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mt-1">
          Review & Submit
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 font-normal mt-1">
          Please review your information carefully before submitting your
          application.
        </p>
      </div>

      <div className="space-y-4">
        {/* Card 1: Contact Information */}
        <div className="bg-[#E2E2E5]/70 border border-gray-300/60 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <User className="w-4 h-4 text-[#6B1294]" />
              <span>Contact Information</span>
            </h3>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="text-xs font-semibold text-[#6B1294] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Pencil className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
            <div>
              <span className="text-gray-500 font-medium">Full Name:</span>
              <span className="font-semibold text-gray-900 ml-2">
                {formData.fullName}
              </span>
            </div>
            <div>
              <span className="text-gray-500 font-medium">Job Title:</span>
              <span className="font-semibold text-gray-900 ml-2">
                {formData.jobTitle}
              </span>
            </div>
            <div>
              <span className="text-gray-500 font-medium">Business Email:</span>
              <span className="font-semibold text-gray-900 ml-2">
                {formData.businessEmail}
              </span>
            </div>
            <div>
              <span className="text-gray-500 font-medium">Contact Number:</span>
              <span className="font-semibold text-gray-900 ml-2">
                {formData.contactNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Company & Portfolio */}
        <div className="bg-[#E2E2E5]/70 border border-gray-300/60 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#6B1294]" />
              <span>Company & Portfolio</span>
            </h3>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              className="text-xs font-semibold text-[#6B1294] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Pencil className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-2 text-xs pt-1">
            <div className="flex justify-between border-b border-gray-300/40 pb-1.5">
              <span className="text-gray-500 font-medium">Company Name:</span>
              <span className="font-semibold text-gray-900">
                {formData.companyName}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-300/40 pb-1.5">
              <span className="text-gray-500 font-medium">Location:</span>
              <span className="font-semibold text-gray-900">
                {formData.city}, {formData.state}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-300/40 pb-1.5">
              <span className="text-gray-500 font-medium">Portfolio Size:</span>
              <span className="font-semibold text-gray-900">
                {formData.portfolioSize}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-300/40 pb-1.5">
              <span className="text-gray-500 font-medium">Maintenance:</span>
              <span className="font-semibold text-gray-900 text-right max-w-xs">
                {formData.maintenance}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Property Types:</span>
              <span className="font-semibold text-gray-900">
                {formData.propertyTypes.join(", ") || "None"}
              </span>
            </div>
          </div>
        </div>

        {/* Confirmation Checkbox Box */}
        <div
          onClick={() => setIsConfirmed(!isConfirmed)}
          className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 cursor-pointer"
        >
          <div
            className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
              isConfirmed
                ? "bg-emerald-600 border-emerald-600 text-white"
                : "border-emerald-500 bg-white"
            }`}
          >
            {isConfirmed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
          <p className="text-xs font-medium text-emerald-900 leading-normal">
            I confirm that all information provided is true, accurate, and
            complete to the best of my knowledge.
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="py-3 px-5 bg-[#E2E2E5] hover:bg-gray-300 border border-gray-300/60 rounded-xl text-gray-800 font-semibold text-sm transition-colors cursor-pointer flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          type="button"
          onClick={handleSubmitClick}
          className="py-3.5 px-6 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer shadow-sm flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>Submit for Review</span>
        </button>
      </div>
    </div>
  );
}
