"use client";

import React, { useState } from "react";
import { ArrowLeft, Building2, Check, FileText, Loader2, Pencil, Send, User as UserIcon } from "lucide-react";
import { VerificationFormData } from "@/types/verification";
import toast from "react-hot-toast";

interface Step4ReviewSubmitProps {
  formData: VerificationFormData;
  onEditStep: (step: number) => void;
  onBack: () => void;
  onSubmit: () => void;
  isServiceProvider?: boolean;
  isSubmitting?: boolean;
}

const FileBadge: React.FC<{ label: string; file: File | string | null | undefined }> = ({ label, file }) => {
  const hasFile = !!file;
  const fileName = typeof file === "string" ? file.split("/").pop() : (file as File)?.name;
  return (
    <div className="flex justify-between border-b border-gray-300/40 pb-1.5 last:border-b-0 last:pb-0">
      <span className="text-gray-500 font-medium">{label}:</span>
      <span className={`font-semibold max-w-xs truncate text-right ${hasFile ? "text-gray-900" : "text-gray-400"}`}>
        {hasFile ? fileName || "File attached" : "Not provided"}
      </span>
    </div>
  );
};

export default function Step4ReviewSubmit({
  formData,
  onEditStep,
  onBack,
  onSubmit,
  isServiceProvider,
  isSubmitting = false,
}: Step4ReviewSubmitProps) {
  const [isConfirmed, setIsConfirmed] = useState<boolean>(true);

  const handleSubmitClick = () => {
    if (!isConfirmed) {
      toast.error("Please confirm your information before submitting.");
      return;
    }
    onSubmit();
  };

  const skills = formData.skills?.length ? formData.skills : formData.serviceCategories || [];

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
        <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-[#6B1294]" />
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
              <span className="font-semibold text-gray-900 ml-2">{formData.fullName}</span>
            </div>
            {!isServiceProvider && (
              <div>
                <span className="text-gray-500 font-medium">Job Title:</span>
                <span className="font-semibold text-gray-900 ml-2">{formData.jobTitle}</span>
              </div>
            )}
            <div>
              <span className="text-gray-500 font-medium">Business Email:</span>
              <span className="font-semibold text-gray-900 ml-2">{formData.businessEmail}</span>
            </div>
            <div>
              <span className="text-gray-500 font-medium">Contact Number:</span>
              <span className="font-semibold text-gray-900 ml-2">{formData.contactNumber}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Business & Provider / Portfolio */}
        <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#6B1294]" />
              <span>{isServiceProvider ? "Business & Provider Profile" : "Company & Portfolio"}</span>
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
              <span className="text-gray-500 font-medium">
                {isServiceProvider ? "Business Name:" : "Company Name:"}
              </span>
              <span className="font-semibold text-gray-900">{formData.companyName}</span>
            </div>
            {!isServiceProvider && (
              <div className="flex justify-between border-b border-gray-300/40 pb-1.5">
                <span className="text-gray-500 font-medium">Legal Name:</span>
                <span className="font-semibold text-gray-900">{formData.legalName || "-"}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-gray-300/40 pb-1.5">
              <span className="text-gray-500 font-medium">Location:</span>
              <span className="font-semibold text-gray-900">
                {formData.city}, {formData.state} {formData.zipCode}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-300/40 pb-1.5">
              <span className="text-gray-500 font-medium">Tax ID / EIN:</span>
              <span className="font-semibold text-gray-900">{formData.taxId}</span>
            </div>
            {!isServiceProvider && formData.website && (
              <div className="flex justify-between border-b border-gray-300/40 pb-1.5">
                <span className="text-gray-500 font-medium">Website:</span>
                <span className="font-semibold text-gray-900">{formData.website}</span>
              </div>
            )}

            {isServiceProvider ? (
              <>
                {formData.bio && (
                  <div className="border-b border-gray-300/40 pb-1.5 space-y-1">
                    <span className="text-gray-500 font-medium block">Business Bio:</span>
                    <p className="font-semibold text-gray-900 whitespace-pre-line leading-relaxed">
                      {formData.bio}
                    </p>
                  </div>
                )}
                <div className="flex justify-between border-b border-gray-300/40 pb-1.5">
                  <span className="text-gray-500 font-medium">Years in Business:</span>
                  <span className="font-semibold text-gray-900">
                    {formData.yearsInBusiness || "3-5 Years"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-300/40 pb-1.5">
                  <span className="text-gray-500 font-medium">Coverage Radius:</span>
                  <span className="font-semibold text-gray-900 text-right max-w-xs">
                    {formData.serviceRadius || "Regional (within 35 miles)"}
                  </span>
                </div>
                <div className="border-b border-gray-300/40 pb-1.5 space-y-1">
                  <span className="text-gray-500 font-medium block">Specialties / Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.length > 0 ? (
                      skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 bg-purple-50 text-[#6B1294] rounded-full text-[11px] font-semibold border border-purple-200"
                        >
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="font-semibold text-gray-400">None</span>
                    )}
                  </div>
                </div>
                {(formData.officeAddress || formData.officeCity || formData.officePhone) && (
                  <div className="border-b border-gray-300/40 pb-1.5 space-y-1">
                    <span className="text-gray-500 font-medium block">Office Contact:</span>
                    <div className="font-semibold text-gray-900 space-y-0.5">
                      {formData.officeAddress && <div>{formData.officeAddress}</div>}
                      {(formData.officeCity || formData.officeState || formData.officeZipCode) && (
                        <div>
                          {[formData.officeCity, formData.officeState, formData.officeZipCode].filter(Boolean).join(", ")}
                        </div>
                      )}
                      {formData.officePhone && <div>{formData.officePhone}</div>}
                    </div>
                  </div>
                )}

                <div className="pt-2 mt-1 p-3 bg-purple-50/40 rounded-lg space-y-2 border border-purple-100">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#6B1294] uppercase tracking-wide">
                    <FileText className="w-3.5 h-3.5" />
                    Verification Documents
                  </div>
                  <FileBadge label="Profile Image" file={formData.profileImage} />
                  <FileBadge label="Government ID" file={formData.governmentIdFile} />
                  <FileBadge label="Proof of Insurance" file={formData.proofOfInsuranceFile} />
                  {formData.licenseNumber && (
                    <FileBadge label="License / Cert #" file={formData.licenseNumber as any} />
                  )}
                  {(formData.additionalDocuments || []).map((doc, i) => (
                    <FileBadge
                      key={i}
                      label={doc.title || `Additional Doc ${i + 1}`}
                      file={doc.file as any}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between border-b border-gray-300/40 pb-1.5">
                  <span className="text-gray-500 font-medium">Portfolio Size:</span>
                  <span className="font-semibold text-gray-900">{formData.portfolioSize}</span>
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
              </>
            )}
          </div>
        </div>

        {/* Confirmation Checkbox Box */}
        <div
          onClick={() => setIsConfirmed(!isConfirmed)}
          className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 cursor-pointer"
        >
          <div
            className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${isConfirmed
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
          className="py-3 px-5 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg text-gray-800 font-semibold text-sm transition-colors cursor-pointer flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          type="button"
          onClick={handleSubmitClick}
          disabled={isSubmitting}
          className="py-3.5 px-6 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold rounded-lg text-sm transition-colors cursor-pointer shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          <span>{isSubmitting ? 'Submitting...' : 'Submit for Review'}</span>
        </button>
      </div>
    </div>
  );
}
