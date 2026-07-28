"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Check } from "lucide-react";
import { VerificationFormData } from "@/types/verification";

interface Step3BusinessDetailsProps {
  formData: VerificationFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateForm: (updater: (prev: VerificationFormData) => VerificationFormData) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function Step3BusinessDetails({
  formData,
  onChange,
  onUpdateForm,
  onBack,
  onNext,
}: Step3BusinessDetailsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePropertyTypeToggle = (type: string) => {
    onUpdateForm((prev) => {
      const exists = prev.propertyTypes.includes(type);
      if (exists) {
        return {
          ...prev,
          propertyTypes: prev.propertyTypes.filter((t) => t !== type),
        };
      } else {
        return { ...prev, propertyTypes: [...prev.propertyTypes, type] };
      }
    });
  };

  const handleContinue = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.companyName.trim())
      newErrors.companyName = "Company Name is required";
    if (!formData.legalName.trim())
      newErrors.legalName = "Legal Business Name is required";
    if (!formData.website.trim())
      newErrors.website = "Company Website URL is required";
    if (!formData.address.trim())
      newErrors.address = "Business Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.taxId.trim()) newErrors.taxId = "Tax ID is required";

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
          STEP 3 OF 4
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mt-1">
          Business Details
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 font-normal mt-1">
          Provide your company information to help us verify your business.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Company Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#6B1294]" />
            <span>Company Details</span>
          </h3>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Company Name *
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={(e) => {
                onChange(e);
                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, companyName: "" }));
              }}
              placeholder="Acme Property Management"
              className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-gray-900 focus:outline-none transition-all ${
                errors.companyName ? "border-red-500 bg-red-50/20" : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
              }`}
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.companyName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Legal Business Name *
            </label>
            <input
              type="text"
              name="legalName"
              value={formData.legalName}
              onChange={(e) => {
                onChange(e);
                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, legalName: "" }));
              }}
              placeholder="Acme Property Management LLC"
              className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-gray-900 focus:outline-none transition-all ${
                errors.legalName ? "border-red-500 bg-red-50/20" : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
              }`}
            />
            {errors.legalName && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.legalName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              DBA/Trade name (optional)
            </label>
            <input
              type="text"
              name="dbaName"
              value={formData.dbaName}
              onChange={onChange}
              placeholder="Acme Property Management"
              className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20 rounded-xl text-sm text-gray-900 focus:outline-none transition-all"
            />
            <p className="text-[11px] text-gray-500 font-normal mt-1">
              Only fill this out if your company operates under a different name from
              its Legal registration
            </p>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Company Website URL *
            </label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={(e) => {
                onChange(e);
                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, website: "" }));
              }}
              placeholder="https://acmeproperty.com"
              className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-gray-900 focus:outline-none transition-all ${
                errors.website ? "border-red-500 bg-red-50/20" : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
              }`}
            />
            {errors.website && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.website}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Business Address / Headquarters *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) => {
                onChange(e);
                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, address: "" }));
              }}
              placeholder="123 Business Blvd, Suite 400"
              className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-gray-900 focus:outline-none transition-all ${
                errors.address ? "border-red-500 bg-red-50/20" : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.address}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={(e) => {
                  onChange(e);
                  if (e.target.value.trim()) setErrors((prev) => ({ ...prev, city: "" }));
                }}
                placeholder="Los Angeles"
                className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-gray-900 focus:outline-none transition-all ${
                  errors.city ? "border-red-500 bg-red-50/20" : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                  <span>⚠️</span> {errors.city}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                State *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={(e) => {
                  onChange(e);
                  if (e.target.value.trim()) setErrors((prev) => ({ ...prev, state: "" }));
                }}
                placeholder="CA"
                className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-gray-900 focus:outline-none transition-all ${
                  errors.state ? "border-red-500 bg-red-50/20" : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
                }`}
              />
              {errors.state && (
                <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                  <span>⚠️</span> {errors.state}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Tax ID *
            </label>
            <input
              type="text"
              name="taxId"
              value={formData.taxId}
              onChange={(e) => {
                onChange(e);
                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, taxId: "" }));
              }}
              placeholder="XX-XXXXXXX"
              className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-gray-900 focus:outline-none transition-all ${
                errors.taxId ? "border-red-500 bg-red-50/20" : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
              }`}
            />
            {errors.taxId && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.taxId}
              </p>
            )}
          </div>
        </div>

        {/* 2. Portfolio Size */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-900">Portfolio Size *</h3>
          <div className="space-y-2">
            {[
              "1-10 Units",
              "11-50 Units",
              "51-200 Units",
              "201-500 Units",
              "501+ Units",
            ].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() =>
                  onUpdateForm((p) => ({ ...p, portfolioSize: size }))
                }
                className={`w-full px-4 py-3 rounded-xl border text-left text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                  formData.portfolioSize === size
                    ? "bg-purple-50 border-[#6B1294] text-[#6B1294] font-semibold"
                    : "bg-white border-gray-300 hover:bg-purple-50/30 text-gray-800"
                }`}
              >
                <span>{size}</span>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    formData.portfolioSize === size
                      ? "border-[#6B1294] bg-[#6B1294]"
                      : "border-gray-400"
                  }`}
                >
                  {formData.portfolioSize === size && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Maintenance Infrastructure */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-900">
            Maintenance Infrastructure *
          </h3>
          <div className="space-y-2">
            {[
              "Yes, we handle all maintenance in-house.",
              "No, we outsource all maintenance to third-party vendors.",
              "Hybrid (We have an on-site team but outsource specialized or overflow work.)",
            ].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() =>
                  onUpdateForm((p) => ({ ...p, maintenance: opt }))
                }
                className={`w-full px-4 py-3 rounded-xl border text-left text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                  formData.maintenance === opt
                    ? "bg-purple-50 border-[#6B1294] text-[#6B1294] font-semibold"
                    : "bg-white border-gray-300 hover:bg-purple-50/30 text-gray-800"
                }`}
              >
                <span>{opt}</span>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                    formData.maintenance === opt
                      ? "border-[#6B1294] bg-[#6B1294]"
                      : "border-gray-400"
                  }`}
                >
                  {formData.maintenance === opt && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Property Type */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-900">
            Property Type{" "}
            <span className="text-xs font-normal text-gray-500">
              (Select all that apply)
            </span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Single-Family Homes",
              "Multi-Family / Apartments",
              "Commercial Buildings",
              "Student Housing",
              "HOAs / Condos",
            ].map((pt) => {
              const isSelected = formData.propertyTypes.includes(pt);
              return (
                <button
                  key={pt}
                  type="button"
                  onClick={() => handlePropertyTypeToggle(pt)}
                  className={`px-4 py-3 rounded-xl border text-left text-sm font-medium transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? "bg-purple-50 border-[#6B1294] text-[#6B1294] font-semibold"
                      : "bg-white border-gray-300 hover:bg-purple-50/30 text-gray-800"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-[#6B1294] border-[#6B1294] text-white"
                        : "border-gray-400 bg-white"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span>{pt}</span>
                </button>
              );
            })}
          </div>
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
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
