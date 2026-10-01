"use client";

import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Check, FileText, Upload, User as UserIcon, X } from "lucide-react";
import { VerificationFormData, IVerificationDocument } from "@/types/verification";

interface Step3BusinessDetailsProps {
  formData: VerificationFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onUpdateForm: (updater: (prev: VerificationFormData) => VerificationFormData) => void;
  onBack: () => void;
  onNext: () => void;
  isServiceProvider?: boolean;
}

interface SingleUploadProps {
  label: string;
  description?: string;
  required?: boolean;
  acceptedTypes?: string;
  file: File | string | null | undefined;
  onChange: (file: File | null) => void;
  error?: string;
}

const SingleFileUpload: React.FC<SingleUploadProps> = ({
  label,
  description,
  required,
  acceptedTypes = "image/*,.pdf,.doc,.docx",
  file,
  onChange,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    onChange(f || null);
  };

  const previewUrl = typeof file === "string" ? file : file ? URL.createObjectURL(file as File) : null;
  const fileName = typeof file === "string" ? file.split("/").pop() : (file as File)?.name;
  const isImage = previewUrl && ((file as File)?.type?.startsWith("image/") || /\.(png|jpe?g|gif|webp)$/i.test(previewUrl));

  return (
    <div>
      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && (
        <p className="text-[11px] text-gray-500 mb-2 leading-relaxed">{description}</p>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        className={`group border-2 border-dashed rounded-xl px-4 py-6 text-center cursor-pointer transition-all hover:bg-purple-50/30 ${
          error ? "border-red-400 bg-red-50/30" : "border-gray-300 bg-white"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileChange}
          className="hidden"
        />
        {file ? (
          <div className="flex flex-col items-center gap-2">
            {isImage ? (
              <img src={previewUrl as string} alt={fileName} className="max-h-32 rounded-lg object-contain border" />
            ) : (
              <div className="flex items-center gap-2 text-[#6B1294] font-semibold">
                <FileText className="w-5 h-5" />
                <span className="truncate max-w-xs text-sm">{fileName}</span>
              </div>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="mt-1 px-3 py-1 text-xs bg-red-50 text-red-600 border border-red-200 rounded-full hover:bg-red-100 cursor-pointer transition-colors"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-[#6B1294] group-hover:bg-[#6B1294] group-hover:text-white transition-colors">
              <Upload className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm font-medium">
              Click to upload {label.toLowerCase()}
            </span>
            <span className="text-[11px] text-gray-400">
              PDF, PNG, JPG up to 10MB
            </span>
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
};

export default function Step3BusinessDetails({
  formData,
  onChange,
  onUpdateForm,
  onBack,
  onNext,
  isServiceProvider,
}: Step3BusinessDetailsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [docTitleInput, setDocTitleInput] = useState<string>("");

  const handlePropertyTypeToggle = (type: string) => {
    onUpdateForm((prev) => {
      const exists = prev.propertyTypes.includes(type);
      if (exists) {
        return { ...prev, propertyTypes: prev.propertyTypes.filter((t) => t !== type) };
      } else {
        return { ...prev, propertyTypes: [...prev.propertyTypes, type] };
      }
    });
  };

  const handleCategoryToggle = (cat: string) => {
    onUpdateForm((prev) => {
      const current = prev.skills?.length ? prev.skills : prev.serviceCategories || [];
      const exists = current.includes(cat);
      const updated = exists ? current.filter((c) => c !== cat) : [...current, cat];
      return { ...prev, serviceCategories: updated, skills: updated };
    });
  };

  const handleCustomSkillAdd = () => {
    const title = docTitleInput.trim();
    if (!title) return;
    onUpdateForm((prev) => {
      const current = prev.skills?.length ? [...prev.skills] : [...(prev.serviceCategories || [])];
      if (current.includes(title)) return prev;
      current.push(title);
      return { ...prev, skills: current, serviceCategories: current };
    });
    setDocTitleInput("");
  };

  const handleRemoveSkill = (skill: string) => {
    onUpdateForm((prev) => {
      const updated = (prev.skills || prev.serviceCategories || []).filter((s) => s !== skill);
      return { ...prev, skills: updated, serviceCategories: updated };
    });
  };

  const handleAddDocument = () => {
    onUpdateForm((prev) => {
      const docs = [...(prev.additionalDocuments || [])];
      docs.push({ title: `Document ${docs.length + 1}`, file: null, type: "other" });
      return { ...prev, additionalDocuments: docs };
    });
  };

  const handleDocChange = (index: number, patch: Partial<IVerificationDocument>) => {
    onUpdateForm((prev) => {
      const docs = [...(prev.additionalDocuments || [])];
      docs[index] = { ...docs[index], ...patch };
      return { ...prev, additionalDocuments: docs };
    });
  };

  const handleRemoveDoc = (index: number) => {
    onUpdateForm((prev) => {
      const docs = [...(prev.additionalDocuments || [])];
      docs.splice(index, 1);
      return { ...prev, additionalDocuments: docs };
    });
  };

  const parseYearsToNumber = (label?: string): number => {
    if (!label) return 0;
    const match = label.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const handleContinue = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.companyName.trim())
      newErrors.companyName = isServiceProvider ? "Business / Company Name is required" : "Company Name is required";
    if (!isServiceProvider) {
      if (!formData.legalName.trim()) newErrors.legalName = "Legal Business Name is required";
      if (!formData.website.trim()) newErrors.website = "Company Website URL is required";
    }
    if (!formData.address.trim()) newErrors.address = "Business Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode?.trim()) newErrors.zipCode = "ZIP / Postal Code is required";
    if (!formData.taxId.trim()) newErrors.taxId = "Tax ID / EIN is required";

    if (isServiceProvider) {
      if (!formData.profileImage) newErrors.profileImage = "Profile / Business image is required";
      if (!formData.governmentIdFile) newErrors.governmentIdFile = "Government ID document is required";
      if (!formData.proofOfInsuranceFile) newErrors.proofOfInsuranceFile = "Proof of Insurance is required";
      const years = parseYearsToNumber(formData.yearsInBusiness);
      if (!years) newErrors.yearsInBusiness = "Years in business is required";
      const skills = formData.skills || formData.serviceCategories || [];
      if (!skills.length) newErrors.skills = "At least one service specialty is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    onNext();
  };

  const skills = formData.skills?.length ? formData.skills : formData.serviceCategories || [];
  const docInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <div className="space-y-6 max-w-3xl animate-in fade-in duration-300">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#6B1294]">
          STEP 3 OF 4
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mt-1">
          {isServiceProvider ? "Provider Profile & Business Details" : "Business Details"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 font-normal mt-1">
          {isServiceProvider
            ? "Provide your business details, trade specialties, and coverage area. Upload required government ID, insurance and additional documents."
            : "Provide your company information to help us verify your business."}
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Company Details (Common) */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#6B1294]" />
            <span>{isServiceProvider ? "Business & Organization Details" : "Company Details"}</span>
          </h3>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              {isServiceProvider ? "Business / Company Name *" : "Company Name *"}
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={(e) => { onChange(e); if (e.target.value.trim()) setErrors((p) => ({ ...p, companyName: "" })); }}
              placeholder={isServiceProvider ? "Apex Plumbing & HVAC Solutions" : "Acme Property Management"}
              className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-gray-900 focus:outline-none transition-all ${errors.companyName ? "border-red-500 bg-red-50/20" : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"}`}
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.companyName}
              </p>
            )}
          </div>

          {/* Legal Business Name + DBA + Website — Property Manager only */}
          {!isServiceProvider && (
            <>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Legal Business Name *
                </label>
                <input
                  type="text"
                  name="legalName"
                  value={formData.legalName}
                  onChange={(e) => { onChange(e); if (e.target.value.trim()) setErrors((p) => ({ ...p, legalName: "" })); }}
                  placeholder="Acme Enterprise Services LLC"
                  className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-gray-900 focus:outline-none transition-all ${errors.legalName ? "border-red-500 bg-red-50/20" : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"}`}
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
                  placeholder="Acme Services"
                  className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20 rounded-lg text-sm text-gray-900 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Company Website URL *
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={(e) => { onChange(e); if (e.target.value.trim()) setErrors((p) => ({ ...p, website: "" })); }}
                  placeholder="https://acmeproperty.com"
                  className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-gray-900 focus:outline-none transition-all ${errors.website ? "border-red-500 bg-red-50/20" : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"}`}
                />
                {errors.website && (
                  <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                    <span>⚠️</span> {errors.website}
                  </p>
                )}
              </div>
            </>
          )}

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              {isServiceProvider ? "Business Street Address *" : "Business Address / Headquarters *"}
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) => { onChange(e); if (e.target.value.trim()) setErrors((p) => ({ ...p, address: "" })); }}
              placeholder="123 Business Blvd, Suite 400"
              className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-gray-900 focus:outline-none transition-all ${errors.address ? "border-red-500 bg-red-50/20" : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"}`}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.address}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={(e) => { onChange(e); if (e.target.value.trim()) setErrors((p) => ({ ...p, city: "" })); }}
                placeholder="Los Angeles"
                className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-gray-900 focus:outline-none transition-all ${errors.city ? "border-red-500 bg-red-50/20" : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"}`}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                  <span>⚠️</span> {errors.city}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={(e) => { onChange(e); if (e.target.value.trim()) setErrors((p) => ({ ...p, state: "" })); }}
                placeholder="CA"
                className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-gray-900 focus:outline-none transition-all ${errors.state ? "border-red-500 bg-red-50/20" : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"}`}
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
              ZIP / Postal Code *
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode || ""}
              onChange={(e) => { onChange(e); if (e.target.value.trim()) setErrors((p) => ({ ...p, zipCode: "" })); }}
              placeholder="90001"
              className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-gray-900 focus:outline-none transition-all ${errors.zipCode ? "border-red-500 bg-red-50/20" : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"}`}
            />
            {errors.zipCode && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.zipCode}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Tax ID / EIN *
            </label>
            <input
              type="text"
              name="taxId"
              value={formData.taxId}
              onChange={(e) => { onChange(e); if (e.target.value.trim()) setErrors((p) => ({ ...p, taxId: "" })); }}
              placeholder="XX-XXXXXXX"
              className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-gray-900 focus:outline-none transition-all ${errors.taxId ? "border-red-500 bg-red-50/20" : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"}`}
            />
            {errors.taxId && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.taxId}
              </p>
            )}
          </div>
        </div>

        {/* SERVICE PROVIDER EXTRA FIELDS */}
        {isServiceProvider && (
          <>
            {/* A. Profile Image */}
            <div className="space-y-4 p-4 bg-purple-50/30 rounded-xl border border-purple-100">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-[#6B1294]" />
                <span>Profile & Business Image *</span>
              </h3>
              <SingleFileUpload
                label="Profile / Business Image"
                description="Upload a clear headshot or business logo for your public provider profile."
                required
                acceptedTypes="image/*"
                file={formData.profileImage}
                onChange={(f) => {
                  onUpdateForm((p) => ({ ...p, profileImage: f }));
                  if (f) setErrors((p) => ({ ...p, profileImage: "" }));
                }}
                error={errors.profileImage}
              />
            </div>

            {/* B. Bio */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900">Business Bio / Description</h3>
              <textarea
                name="bio"
                value={formData.bio || ""}
                onChange={onChange as any}
                rows={4}
                placeholder="Tell us about your business, team, certifications, and experience..."
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20 rounded-lg text-sm text-gray-900 focus:outline-none transition-all resize-y"
              />
            </div>

            {/* C. Office Info - Separate from Business Address */}
            <div className="space-y-4 p-4 bg-sky-50/40 rounded-xl border border-sky-100">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#6B1294]" />
                <span>Office Contact Information</span>
              </h3>
              <p className="text-[11px] text-gray-500 -mt-2">
                Provide dedicated office address and phone (if different from HQ).
              </p>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Office Address
                </label>
                <input
                  type="text"
                  name="officeAddress"
                  value={formData.officeAddress || ""}
                  onChange={onChange}
                  placeholder="45 Commercial Rd"
                  className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20 rounded-lg text-sm text-gray-900 focus:outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Office City</label>
                  <input
                    type="text"
                    name="officeCity"
                    value={formData.officeCity || ""}
                    onChange={onChange}
                    placeholder="London"
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20 rounded-lg text-sm text-gray-900 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Office State</label>
                  <input
                    type="text"
                    name="officeState"
                    value={formData.officeState || ""}
                    onChange={onChange}
                    placeholder="England"
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20 rounded-lg text-sm text-gray-900 focus:outline-none transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Office ZIP</label>
                  <input
                    type="text"
                    name="officeZipCode"
                    value={formData.officeZipCode || ""}
                    onChange={onChange}
                    placeholder="E1 6AN"
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20 rounded-lg text-sm text-gray-900 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Office Phone</label>
                  <input
                    type="text"
                    name="officePhone"
                    value={formData.officePhone || ""}
                    onChange={onChange}
                    placeholder="+44 20 7946 0912"
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20 rounded-lg text-sm text-gray-900 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* D. Years in Business */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-900">Years in Business *</h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {["1-3 Years", "3-5 Years", "5-10 Years", "10+ Years"].map((yr) => {
                  const selected = (formData.yearsInBusiness || "3-5 Years") === yr;
                  return (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => {
                        onUpdateForm((p) => ({ ...p, yearsInBusiness: yr }));
                        setErrors((p) => ({ ...p, yearsInBusiness: "" }));
                      }}
                      className={`px-3 py-2.5 rounded-lg border text-center text-xs sm:text-sm font-medium transition-all cursor-pointer ${selected ? "bg-purple-50 border-[#6B1294] text-[#6B1294] font-semibold" : "bg-white border-gray-300 hover:bg-purple-50/30 text-gray-800"}`}
                    >
                      {yr}
                    </button>
                  );
                })}
              </div>
              {errors.yearsInBusiness && (
                <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                  <span>⚠️</span> {errors.yearsInBusiness}
                </p>
              )}
            </div>

            {/* E. Service Coverage Radius */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-900">Service Coverage Radius *</h3>
              <div className="space-y-2">
                {[
                  "Local (within 15 miles)",
                  "Regional (within 35 miles)",
                  "Metropolitan area (within 50 miles)",
                  "Statewide / Multi-County",
                ].map((rad) => {
                  const selected = (formData.serviceRadius || "Regional (within 35 miles)") === rad;
                  return (
                    <button
                      key={rad}
                      type="button"
                      onClick={() => onUpdateForm((p) => ({ ...p, serviceRadius: rad }))}
                      className={`w-full px-4 py-3 rounded-lg border text-left text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${selected ? "bg-purple-50 border-[#6B1294] text-[#6B1294] font-semibold" : "bg-white border-gray-300 hover:bg-purple-50/30 text-gray-800"}`}
                    >
                      <span>{rad}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${selected ? "border-[#6B1294] bg-[#6B1294]" : "border-gray-400"}`}>
                        {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* F. Service Specialties / Skills */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-900">
                Service Specialties & Skills{" "}
                <span className="text-xs font-normal text-gray-500">(Select all that apply) *</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Plumbing Repair & Install",
                  "Electrical & Wiring",
                  "HVAC & Climate Control",
                  "Roofing & Exterior",
                  "Painting & Drywall",
                  "Carpentry & Cabinetry",
                  "Janitorial & Deep Cleaning",
                  "Landscaping & Grounds",
                  "Pest Control",
                  "Appliance Repair",
                ].map((cat) => {
                  const isSelected = skills.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => { handleCategoryToggle(cat); setErrors((p) => ({ ...p, skills: "" })); }}
                      className={`px-4 py-3 rounded-lg border text-left text-sm font-medium transition-all cursor-pointer flex items-center gap-3 ${isSelected ? "bg-purple-50 border-[#6B1294] text-[#6B1294] font-semibold" : "bg-white border-gray-300 hover:bg-purple-50/30 text-gray-800"}`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${isSelected ? "bg-[#6B1294] border-[#6B1294] text-white" : "border-gray-400 bg-white"}`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Add custom skill
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={docTitleInput}
                    onChange={(e) => setDocTitleInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleCustomSkillAdd())}
                    placeholder="e.g., Solar Panel Installation"
                    className="flex-1 px-4 py-2.5 bg-white border border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20 rounded-lg text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleCustomSkillAdd}
                    className="px-4 py-2.5 bg-[#6B1294] text-white rounded-lg text-sm font-semibold hover:bg-[#580e7d] transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skills.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-[#6B1294] text-xs font-semibold rounded-full border border-purple-200"
                      >
                        {s}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(s)}
                          className="ml-1 text-[#6B1294]/70 hover:text-red-500 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                {errors.skills && (
                  <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                    <span>⚠️</span> {errors.skills}
                  </p>
                )}
              </div>
            </div>

            {/* G. Trade License Number */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                Trade License / Certification Number (Optional)
              </label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber || ""}
                onChange={onChange}
                placeholder="e.g. C-36-894102 / LIC-2026-90"
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20 rounded-lg text-sm text-gray-900 focus:outline-none transition-all"
              />
            </div>

            {/* H. Required Documents - Gov ID + Insurance + Additional Docs */}
            <div className="space-y-4 p-4 bg-emerald-50/30 rounded-xl border border-emerald-100">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#6B1294]" />
                <span>Verification Documents</span>
              </h3>
              <p className="text-[11px] text-gray-500 -mt-2">
                Required documents are used to verify your business identity and insurance coverage.
              </p>

              <SingleFileUpload
                label="Government Issued ID"
                description="Upload Passport, Driver License, or National ID card (front + back if possible). *Required"
                required
                acceptedTypes="image/*,.pdf"
                file={formData.governmentIdFile}
                onChange={(f) => {
                  onUpdateForm((p) => ({ ...p, governmentIdFile: f }));
                  if (f) setErrors((p) => ({ ...p, governmentIdFile: "" }));
                }}
                error={errors.governmentIdFile}
              />

              <SingleFileUpload
                label="Proof of Insurance"
                description="Upload Certificate of Insurance (COI) or Liability Insurance document. *Required"
                required
                acceptedTypes="image/*,.pdf"
                file={formData.proofOfInsuranceFile}
                onChange={(f) => {
                  onUpdateForm((p) => ({ ...p, proofOfInsuranceFile: f }));
                  if (f) setErrors((p) => ({ ...p, proofOfInsuranceFile: "" }));
                }}
                error={errors.proofOfInsuranceFile}
              />

              {/* Additional Documents (Dynamic list) */}
              <div className="space-y-3 border-t border-emerald-200 pt-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-800">
                    Additional Business Documents{" "}
                    <span className="text-[11px] text-gray-500 font-normal">(Optional)</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddDocument}
                    className="px-3 py-1.5 text-xs font-semibold bg-[#6B1294] text-white rounded-lg hover:bg-[#580e7d] cursor-pointer transition-colors"
                  >
                    + Add Document
                  </button>
                </div>
                {(formData.additionalDocuments || []).map((doc, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-emerald-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={doc.title}
                        onChange={(e) => handleDocChange(idx, { title: e.target.value })}
                        placeholder={`Document title (e.g., Trade License)`}
                        className="text-xs sm:text-sm font-semibold bg-transparent border-b border-gray-200 focus:border-[#6B1294] focus:outline-none px-1 py-1 w-2/3"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveDoc(idx)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <SingleFileUpload
                      label={`File ${idx + 1}`}
                      acceptedTypes="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                      file={doc.file as any}
                      onChange={(f) => handleDocChange(idx, { file: f as any })}
                    />
                  </div>
                ))}
                {(!formData.additionalDocuments || formData.additionalDocuments.length === 0) && (
                  <p className="text-[11px] text-gray-400 text-center py-2 border border-dashed border-emerald-200 rounded-lg">
                    Examples: Trade Licenses, Certifications, W-9, Business Registration, Reference Letters
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* PROPERTY MANAGER SPECIFIC FIELDS */}
        {!isServiceProvider && (
          <>
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-900">Portfolio Size *</h3>
              <div className="space-y-2">
                {["1-10 Units", "11-50 Units", "51-200 Units", "201-500 Units", "501+ Units"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => onUpdateForm((p) => ({ ...p, portfolioSize: size }))}
                    className={`w-full px-4 py-3 rounded-lg border text-left text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${formData.portfolioSize === size ? "bg-purple-50 border-[#6B1294] text-[#6B1294] font-semibold" : "bg-white border-gray-300 hover:bg-purple-50/30 text-gray-800"}`}
                  >
                    <span>{size}</span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.portfolioSize === size ? "border-[#6B1294] bg-[#6B1294]" : "border-gray-400"}`}>
                      {formData.portfolioSize === size && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-900">Maintenance Infrastructure *</h3>
              <div className="space-y-2">
                {[
                  "Yes, we handle all maintenance in-house.",
                  "No, we outsource all maintenance to third-party vendors.",
                  "Hybrid (We have an on-site team but outsource specialized or overflow work.)",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onUpdateForm((p) => ({ ...p, maintenance: opt }))}
                    className={`w-full px-4 py-3 rounded-lg border text-left text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${formData.maintenance === opt ? "bg-purple-50 border-[#6B1294] text-[#6B1294] font-semibold" : "bg-white border-gray-300 hover:bg-purple-50/30 text-gray-800"}`}
                  >
                    <span>{opt}</span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${formData.maintenance === opt ? "border-[#6B1294] bg-[#6B1294]" : "border-gray-400"}`}>
                      {formData.maintenance === opt && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-900">
                Property Type <span className="text-xs font-normal text-gray-500">(Select all that apply)</span>
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
                      className={`px-4 py-3 rounded-lg border text-left text-sm font-medium transition-all cursor-pointer flex items-center gap-3 ${isSelected ? "bg-purple-50 border-[#6B1294] text-[#6B1294] font-semibold" : "bg-white border-gray-300 hover:bg-purple-50/30 text-gray-800"}`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${isSelected ? "bg-[#6B1294] border-[#6B1294] text-white" : "border-gray-400 bg-white"}`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{pt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

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
          onClick={handleContinue}
          className="py-3 px-6 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold rounded-lg text-sm transition-colors cursor-pointer shadow-sm flex items-center gap-2"
        >
          <span>Save & Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
