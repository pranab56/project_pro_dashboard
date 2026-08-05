"use client";

import React, { useState, useRef } from "react";
import {
  Camera,
  Check,
  ChevronDown,
  FileText,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  ShieldCheck,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ServiceProviderProfilePage() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Form State matching screenshot
  const [personal, setPersonal] = useState({
    firstName: "James",
    lastName: "Donovan",
    email: "james.donovan@email.com",
    phone: "+1 (512) 555-0142",
    streetAddress: "2847 Cedar Creek Lane",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    bio: "",
  });

  const [business, setBusiness] = useState({
    companyName: "Donovan Property Services LLC",
    officeAddress: "400 Commerce St, Suite 110",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    officePhone: "+1 (512) 555-0200",
    taxId: "82-4917630",
    yearsInBusiness: "8",
  });

  const [license, setLicense] = useState({
    type: "",
    number: "TX-PL-209374",
    dateIssued: "",
    stateIssued: "",
  });

  const [skills] = useState<string[]>([
    "Plumbing",
    "Electrical",
    "HVAC",
    "Flooring",
    "Painting",
    "Roofing",
  ]);

  const [documents, setDocuments] = useState([
    {
      id: "1",
      name: "Government_ID.pdf",
      size: "1.2 MB",
      badge: "Government I.D.",
      badgeColor: "bg-[#DBEAFE] text-[#2563EB]",
    },
    {
      id: "2",
      name: "Insurance_Certificate_2026.pdf",
      size: "840 KB",
      badge: "Proof of Insurance",
      badgeColor: "bg-[#DCFCE7] text-[#16A34A]",
    },
  ]);

  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const docInputRef = useRef<HTMLInputElement | null>(null);

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc = {
        id: Date.now().toString(),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        badge: "Custom Document",
        badgeColor: "bg-purple-100 text-[#5B1B95]",
      };
      setDocuments([...documents, newDoc]);
      toast.success("Document uploaded successfully!");
    }
  };

  const handleDeleteDoc = (id: string) => {
    setDocuments(documents.filter((d) => d.id !== id));
    toast.success("Document removed.");
  };

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-row items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Profile
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5 sm:mt-1">
            Manage your account details, business information, and service preferences.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsEditing(!isEditing);
            if (isEditing) toast.success("Profile saved!");
          }}
          className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold px-4 py-2.5 rounded-xl shadow-2xs transition-colors cursor-pointer flex items-center gap-2 text-xs sm:text-sm shrink-0"
        >
          <Pencil className="w-4 h-4 text-gray-600" />
          <span>{isEditing ? "Save Profile" : "Edit Profile"}</span>
        </button>
      </div>

      {/* Main 2 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Profile Summary Card (4 Cols) */}
        <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-2xs space-y-6 self-start">
          {/* Avatar Circle */}
          <div className="flex flex-col items-center text-center">
            <div className="relative group cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
              <input type="file" ref={avatarInputRef} accept="image/*" className="hidden" />
              <div className="w-24 h-24 rounded-full bg-[#5B1B95] text-white font-bold text-3xl flex items-center justify-center shadow-md">
                JD
              </div>
              <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#5B1B95] text-white flex items-center justify-center border-2 border-white shadow-xs">
                <Camera className="w-3.5 h-3.5" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mt-4">
              {personal.firstName} {personal.lastName}
            </h2>
            <p className="text-xs text-gray-500 font-normal mt-0.5">
              Licensed Contractor
            </p>
          </div>

          <div className="border-t border-gray-300/50 pt-4 space-y-2.5 text-xs text-gray-600 font-normal">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-gray-400 shrink-0" />
              <span>{personal.email}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-gray-400 shrink-0" />
              <span>{personal.phone}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
              <span>{personal.city}, {personal.state}</span>
            </div>
          </div>

          {/* SKILLS Box */}
          <div className="border-t border-gray-300/50 pt-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              SKILLS
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-[#F2E7FC] text-[#5B1B95] border border-[#E1D4F4] font-semibold text-xs px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Details Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Personal Information */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-gray-900">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={personal.firstName}
                  onChange={(e) => setPersonal({ ...personal, firstName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={personal.lastName}
                  onChange={(e) => setPersonal({ ...personal, lastName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={personal.email}
                  onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={personal.phone}
                  onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={personal.streetAddress}
                onChange={(e) => setPersonal({ ...personal, streetAddress: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={personal.city}
                  onChange={(e) => setPersonal({ ...personal, city: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={personal.state}
                  onChange={(e) => setPersonal({ ...personal, state: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={personal.zipCode}
                  onChange={(e) => setPersonal({ ...personal, zipCode: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                rows={3}
                value={personal.bio}
                onChange={(e) => setPersonal({ ...personal, bio: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95] resize-none"
              />
            </div>
          </div>

          {/* 2. Business Information */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-gray-900">
              Business Information
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Business / Company Name
              </label>
              <input
                type="text"
                value={business.companyName}
                onChange={(e) => setBusiness({ ...business, companyName: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Office / Mailing Address
              </label>
              <input
                type="text"
                value={business.officeAddress}
                onChange={(e) => setBusiness({ ...business, officeAddress: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={business.city}
                  onChange={(e) => setBusiness({ ...business, city: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={business.state}
                  onChange={(e) => setBusiness({ ...business, state: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={business.zipCode}
                  onChange={(e) => setBusiness({ ...business, zipCode: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Office Phone Number
                </label>
                <input
                  type="text"
                  value={business.officePhone}
                  onChange={(e) => setBusiness({ ...business, officePhone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Business Tax I.D. Number
                </label>
                <input
                  type="text"
                  value={business.taxId}
                  onChange={(e) => setBusiness({ ...business, taxId: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Years in Business
                </label>
                <input
                  type="text"
                  value={business.yearsInBusiness}
                  onChange={(e) => setBusiness({ ...business, yearsInBusiness: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
                />
              </div>
            </div>
          </div>

          {/* 3. License Information */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  License Information
                </h3>
                <p className="text-xs text-gray-500 font-normal mt-0.5">
                  Add all active professional licenses. You may attach a copy of each license document.
                </p>
              </div>

              <button
                type="button"
                className="bg-[#5B1B95] hover:bg-[#4a157a] text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer shrink-0"
              >
                Add more
              </button>
            </div>

            {/* License Box */}
            <div className="bg-gray-200/40 border border-gray-300/60 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <ShieldCheck className="w-4 h-4 text-[#5B1B95]" />
                <span>License 2 — Plumbing</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    License Type
                  </label>
                  <input
                    type="text"
                    value={license.type}
                    onChange={(e) => setLicense({ ...license, type: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    License Number
                  </label>
                  <input
                    type="text"
                    value={license.number}
                    onChange={(e) => setLicense({ ...license, number: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Date Issued
                  </label>
                  <input
                    type="text"
                    value={license.dateIssued}
                    onChange={(e) => setLicense({ ...license, dateIssued: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    State Issued
                  </label>
                  <input
                    type="text"
                    value={license.stateIssued}
                    onChange={(e) => setLicense({ ...license, stateIssued: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#5B1B95]"
                  />
                </div>
              </div>

              <div className="text-xs text-gray-500 font-normal pt-1">
                License document:{" "}
                <button type="button" className="text-[#5B1B95] font-semibold underline cursor-pointer">
                  Attach File
                </button>
              </div>
            </div>
          </div>

          {/* 4. Skills & Specializations */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-2xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Skills & Specializations
              </h3>
              <p className="text-xs text-gray-500 font-normal mt-0.5">
                Select all service types you offer. These are shown to property managers.
              </p>
            </div>

            {/* Select Dropdown pill */}
            <div className="relative">
              <div className="w-full px-4 py-3 bg-gray-200/50 border border-gray-300/70 rounded-xl text-sm text-gray-900 font-semibold flex items-center justify-between cursor-pointer">
                <span>6 skills selected</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Skill Pills */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-[#F2E7FC] text-[#5B1B95] border border-[#E1D4F4] font-semibold text-xs px-3.5 py-1.5 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* 5. Documents & Verification */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-2xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Documents & Verification
              </h3>
              <p className="text-xs text-gray-500 font-normal mt-0.5">
                Upload required documents. Accepted formats: PDF, JPG, PNG (max 10 MB each).
              </p>
            </div>

            {/* Upload Drag & Drop Area */}
            <input
              type="file"
              ref={docInputRef}
              accept=".pdf,.jpg,.png"
              onChange={handleDocUpload}
              className="hidden"
            />
            <div
              onClick={() => docInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 bg-gray-200/30 hover:bg-gray-200/50 rounded-2xl p-6 text-center cursor-pointer transition-all"
            >
              <button
                type="button"
                className="bg-[#5B1B95] hover:bg-[#4a157a] text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors cursor-pointer inline-flex items-center gap-2 mb-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload File</span>
              </button>
              <p className="text-xs text-gray-600 font-semibold">
                <span className="text-[#5B1B95] font-bold">Click to upload</span> or drag and drop
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                PDF, JPG or PNG - Max 10 MB
              </p>
            </div>

            {/* Uploaded Documents List */}
            <div className="space-y-2.5">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-gray-200/40 border border-gray-300/50 rounded-xl p-3.5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#5B1B95] flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">
                        {doc.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-normal">
                        {doc.size}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${doc.badgeColor}`}>
                      {doc.badge}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteDoc(doc.id)}
                      className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
