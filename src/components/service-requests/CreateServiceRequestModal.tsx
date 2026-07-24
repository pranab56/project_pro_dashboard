"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, X } from "lucide-react";
import { PriorityType, ServiceRequest } from "@/types/serviceRequest";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

interface CreateServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newReq: ServiceRequest) => void;
  totalRequestsCount: number;
}

export default function CreateServiceRequestModal({
  isOpen,
  onClose,
  onSubmit,
  totalRequestsCount,
}: CreateServiceRequestModalProps) {
  const [formProperty, setFormProperty] = useState<string>("Sunset Apartments");
  const [formTitle, setFormTitle] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");
  const [formPriority, setFormPriority] = useState<PriorityType>("Medium");
  const [formIsOccupied, setFormIsOccupied] = useState<boolean>(false);
  const [formTenantName, setFormTenantName] = useState<string>("");
  const [formTenantPhone, setFormTenantPhone] = useState<string>("");
  const [formExtraTitle, setFormExtraTitle] = useState<string>("");
  const [formImage, setFormImage] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormImage(imageUrl);
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormImage(imageUrl);
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formProperty) {
      newErrors.property = "Property selection is required";
    }
    if (!formTitle.trim()) {
      newErrors.title = "Issue Title is required";
    }
    if (!formDescription.trim()) {
      newErrors.description = "Description is required";
    }

    if (formIsOccupied) {
      if (!formTenantName.trim()) {
        newErrors.tenantName = "Tenant Name is required";
      }
      if (!formTenantPhone.trim()) {
        newErrors.tenantPhone = "Phone Number is required";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    const newId = `SR-00${totalRequestsCount + 1}`;
    const newReq: ServiceRequest = {
      id: newId,
      title: formTitle,
      property: formProperty,
      address: "123 Sunset Blvd, Los Angeles, CA 90028",
      priority: formPriority,
      status: "Pending",
      stage: 1,
      stageText: "Stage 1: Started",
      contractor: "Unassigned",
      createdDate: "Jun 26, 2026",
      isOccupied: formIsOccupied,
      tenantName: formIsOccupied ? formTenantName : undefined,
      tenantPhone: formIsOccupied ? formTenantPhone : undefined,
    };

    onSubmit(newReq);

    // Reset Form
    setFormTitle("");
    setFormDescription("");
    setFormPriority("Medium");
    setFormIsOccupied(false);
    setFormTenantName("");
    setFormTenantPhone("");
    setFormExtraTitle("");
    setFormImage("");
    setErrors({});
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-[#EBEBEB] rounded-xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-gray-300/60 max-h-[92vh] overflow-hidden relative flex flex-col animate-in fade-in zoom-in-95 duration-200 ease-out">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Create Service Request
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
              Submit a new request for your property maintenance team.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1 flex-1">
          {/* Select Property */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Select Property *
            </label>
            <Select
              value={formProperty}
              onValueChange={(val) => {
                setFormProperty(val);
                setErrors((prev) => ({ ...prev, property: "" }));
              }}
            >
              <SelectTrigger
                className={`w-full h-[46px] px-4 py-6 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 focus:outline-none transition-all cursor-pointer shadow-none ${
                  errors.property ? "border-red-500 bg-red-50/20" : "border-transparent focus:bg-white"
                }`}
              >
                <SelectValue placeholder="Select Property" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl border border-gray-200 shadow-lg z-[60]">
                <SelectItem value="Sunset Apartments">Sunset Apartments</SelectItem>
                <SelectItem value="Green Valley Complex">Green Valley Complex</SelectItem>
                <SelectItem value="TechHub Tower">TechHub Tower</SelectItem>
                <SelectItem value="Maple Street Condos">Maple Street Condos</SelectItem>
                <SelectItem value="Harbor View Plaza">Harbor View Plaza</SelectItem>
              </SelectContent>
            </Select>
            {errors.property && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.property}
              </p>
            )}
          </div>

          {/* Issue Title */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Issue Title *
            </label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => {
                setFormTitle(e.target.value);
                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, title: "" }));
              }}
              placeholder="e.g. Water Leak under Kitchen Sink"
              className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${
                errors.title ? "border-red-500 bg-red-50/20" : "border-transparent focus:bg-white"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Description *
            </label>
            <textarea
              rows={3}
              value={formDescription}
              onChange={(e) => {
                setFormDescription(e.target.value);
                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, description: "" }));
              }}
              placeholder="Detailed description of the issue..."
              className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all resize-none ${
                errors.description ? "border-red-500 bg-red-50/20" : "border-transparent focus:bg-white"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.description}
              </p>
            )}
          </div>

          {/* Priority Level Pills */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Priority Level *
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(["Urgent", "High", "Medium", "Low"] as PriorityType[]).map((pri) => (
                <button
                  key={pri}
                  type="button"
                  onClick={() => setFormPriority(pri)}
                  className={`py-2.5 px-2 rounded-xl font-medium text-xs sm:text-sm text-center cursor-pointer transition-all ${
                    formPriority === pri
                      ? "border-2 border-[#6B1294] bg-[#F2E7FC] text-[#6B1294] font-bold"
                      : "bg-[#E2E2E5] text-gray-700 border border-transparent hover:bg-gray-300"
                  }`}
                >
                  {pri}
                </button>
              ))}
            </div>
          </div>

          {/* Occupied Toggle */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Is unit/ property occupied? *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormIsOccupied(true)}
                className={`py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center cursor-pointer transition-all ${
                  formIsOccupied
                    ? "border-2 border-emerald-500 bg-emerald-100 text-emerald-800"
                    : "bg-[#E2E2E5] text-gray-700 border border-transparent hover:bg-gray-300"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setFormIsOccupied(false)}
                className={`py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center cursor-pointer transition-all ${
                  !formIsOccupied
                    ? "border-2 border-red-300 bg-red-100 text-red-700"
                    : "bg-[#E2E2E5] text-gray-700 border border-transparent hover:bg-gray-300"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* Tenant fields if occupied */}
          {formIsOccupied && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                    Tenant Name *
                  </label>
                  <input
                    type="text"
                    value={formTenantName}
                    onChange={(e) => {
                      setFormTenantName(e.target.value);
                      if (e.target.value.trim()) setErrors((prev) => ({ ...prev, tenantName: "" }));
                    }}
                    placeholder="Nichole"
                    className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${
                      errors.tenantName ? "border-red-500 bg-red-50/20" : "border-transparent focus:bg-white"
                    }`}
                  />
                  {errors.tenantName && (
                    <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                      <span>⚠️</span> {errors.tenantName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    value={formTenantPhone}
                    onChange={(e) => {
                      setFormTenantPhone(e.target.value);
                      if (e.target.value.trim()) setErrors((prev) => ({ ...prev, tenantPhone: "" }));
                    }}
                    placeholder="+555 2552 552"
                    className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${
                      errors.tenantPhone ? "border-red-500 bg-red-50/20" : "border-transparent focus:bg-white"
                    }`}
                  />
                  {errors.tenantPhone && (
                    <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                      <span>⚠️</span> {errors.tenantPhone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Request Location Details
                </label>
                <input
                  type="text"
                  value={formExtraTitle}
                  onChange={(e) => setFormExtraTitle(e.target.value)}
                  placeholder="Where is the issue? Example- Leaking pipe in kitchen"
                  className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </>
          )}

          {/* Photos Upload */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Upload Photos
            </label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                errors.image
                  ? "border-red-500 bg-red-50/30"
                  : formImage
                  ? "border-purple-400 bg-purple-50/30"
                  : "border-gray-300/80 bg-[#E2E2E5]/60 hover:bg-white"
              }`}
            >
              {formImage ? (
                <div className="relative group">
                  <img
                    src={formImage}
                    alt="Service request preview"
                    className="w-full h-36 object-cover rounded-lg shadow-xs"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-semibold">
                    Click to change photo
                  </div>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-7 h-7 text-gray-400 mx-auto mb-1.5" />
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">
                    Drag & drop photos here, or{" "}
                    <span className="text-[#6B1294] font-semibold underline">
                      browse
                    </span>
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    PNG, JPG up to 3 images
                  </p>
                </>
              )}
            </div>
            {errors.image && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.image}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 px-4 bg-[#E2E2E5] hover:bg-gray-300 border border-gray-300/60 rounded-xl text-gray-800 font-semibold text-sm sm:text-base transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 px-4 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold rounded-xl shadow-sm text-sm sm:text-base transition-colors cursor-pointer"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
