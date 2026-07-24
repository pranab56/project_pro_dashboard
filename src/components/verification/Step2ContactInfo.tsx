"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { VerificationFormData } from "@/types/verification";

interface Step2ContactInfoProps {
  formData: VerificationFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function Step2ContactInfo({
  formData,
  onChange,
  onBack,
  onNext,
}: Step2ContactInfoProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleContinue = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job Title is required";
    if (!formData.businessEmail.trim())
      newErrors.businessEmail = "Business Email is required";
    if (!formData.contactNumber.trim())
      newErrors.contactNumber = "Contact Number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    onNext();
  };

  return (
    <div className="space-y-6 max-w-3xl animate-in fade-in duration-300">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#6B1294]">
          STEP 2 OF 4
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mt-1">
          Contact Information
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 font-normal mt-1">
          Provide your primary contact details below to set up your premier
          property care account.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => {
                onChange(e);
                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, fullName: "" }));
              }}
              placeholder="Alex Morgan"
              className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 focus:outline-none transition-all ${
                errors.fullName
                  ? "border-red-500 bg-red-50/20"
                  : "border-transparent focus:bg-white"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Job Title *
            </label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => {
                onChange(e);
                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, jobTitle: "" }));
              }}
              placeholder="Property Manager"
              className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 focus:outline-none transition-all ${
                errors.jobTitle
                  ? "border-red-500 bg-red-50/20"
                  : "border-transparent focus:bg-white"
              }`}
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.jobTitle}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
            Business Email Address *
          </label>
          <input
            type="email"
            name="businessEmail"
            value={formData.businessEmail}
            onChange={(e) => {
              onChange(e);
              if (e.target.value.trim()) setErrors((prev) => ({ ...prev, businessEmail: "" }));
            }}
            placeholder="alex@yourcompany.com"
            className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 focus:outline-none transition-all ${
              errors.businessEmail
                ? "border-red-500 bg-red-50/20"
                : "border-transparent focus:bg-white"
            }`}
          />
          <p className="text-[11px] text-gray-500 font-normal mt-1">
            Please use a company email address. Public domains (like Gmail,
            Yahoo or Outlook) are not accepted.
          </p>
          {errors.businessEmail && (
            <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
              <span>⚠️</span> {errors.businessEmail}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
            Contact Number *
          </label>
          <input
            type="number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={(e) => {
              onChange(e);
              if (e.target.value.trim()) setErrors((prev) => ({ ...prev, contactNumber: "" }));
            }}
            placeholder="+1 (555) 000-0000"
            className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 focus:outline-none transition-all ${
              errors.contactNumber
                ? "border-red-500 bg-red-50/20"
                : "border-transparent focus:bg-white"
            }`}
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
              <span>⚠️</span> {errors.contactNumber}
            </p>
          )}
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
          onClick={handleContinue}
          className="py-3 px-6 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer shadow-sm flex items-center gap-2"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
