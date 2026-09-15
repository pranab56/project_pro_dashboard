"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, User, Briefcase, Mail, Phone } from "lucide-react";
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
      newErrors.contactNumber = "Business Phone Number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    onNext();
  };

  return (
    <div className="space-y-6 max-w-3xl animate-in fade-in duration-300">
      {/* Header Section matching screenshot */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
          STEP 2 OF 4
        </span>
        <h1 className="text-2xl sm:text-3xl font-medium text-[#2E0054] tracking-tight mt-1">
          Contact Details
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 font-normal mt-1 leading-relaxed max-w-2xl">
          Tell us who to contact for your account. This information helps us keep your account secure and ensures you receive important updates.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
            Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => {
                onChange(e);
                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, fullName: "" }));
              }}
              placeholder="Enter your full name"
              className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${errors.fullName
                  ? "border-red-500 bg-red-50/20"
                  : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
                }`}
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
              <span>⚠️</span> {errors.fullName}
            </p>
          )}
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
            Job Title *
          </label>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => {
                onChange(e);
                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, jobTitle: "" }));
              }}
              placeholder="e.g., Property Manager, Director, CEO"
              className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${errors.jobTitle
                  ? "border-red-500 bg-red-50/20"
                  : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
                }`}
            />
          </div>
          {errors.jobTitle && (
            <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
              <span>⚠️</span> {errors.jobTitle}
            </p>
          )}
        </div>

        {/* Business Email Address */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
            Business Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              name="businessEmail"
              value={formData.businessEmail}
              onChange={(e) => {
                onChange(e);
                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, businessEmail: "" }));
              }}
              placeholder="you@company.com"
              className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${errors.businessEmail
                  ? "border-red-500 bg-red-50/20"
                  : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
                }`}
            />
          </div>
          {errors.businessEmail && (
            <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
              <span>⚠️</span> {errors.businessEmail}
            </p>
          )}
        </div>

        {/* Business Phone Number */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
            Business Phone Number *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={(e) => {
                onChange(e);
                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, contactNumber: "" }));
              }}
              placeholder="(555) 123-4567"
              className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${errors.contactNumber
                  ? "border-red-500 bg-red-50/20"
                  : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
                }`}
            />
          </div>
          <p className="text-[11px] text-gray-500 font-normal mt-1">
            Use a business phone number (not a personal number).
          </p>
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
          className="py-3 px-5 bg-white hover:bg-gray-100 border border-gray-300 rounded-xl text-gray-800 font-semibold text-sm transition-colors cursor-pointer flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          type="button"
          onClick={handleContinue}
          className="py-3 px-6 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer shadow-sm flex items-center gap-2"
        >
          <span>Save & Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
