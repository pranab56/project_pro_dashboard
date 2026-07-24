"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { Save } from "lucide-react";

export default function ProfileTab() {
  const [profileData, setProfileData] = useState({
    // Profile Information
    firstName: "Alex",
    lastName: "Morgan",
    username: "Alex",
    jobTitle: "Morgan",
    email: "alex.morgan@projexpro.com",
    phone: "+1 (555) 234-5678",

    // Registered Business Information
    parentCompanyName: "ProjexPro Management LLC",
    parentCompanyAddress: "ProjexPro Management LLC",
    city: "Los Angeles",
    state: "CA",
    country: "United States",
    website: "alexmorgan.com",
    businessPhone: "+1 (555) 234-5678",

    // Secondary Contact Information
    secFullName: "Alex",
    secJobTitle: "Morgan",
    secEmail: "alex.morgan@projexpro.com",
    secPhone: "+1 (555) 234-5678",
  });

  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const photoInputRef = React.useRef<HTMLInputElement | null>(null);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      setProfilePhoto(photoUrl);
      toast.success("Profile photo updated!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    if (value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!profileData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!profileData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!profileData.email.trim()) {
      newErrors.email = "Email Address is required";
    }
    if (!profileData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Profile settings updated successfully!");
    setErrors({});
  };

  const handleChangePhoto = () => {
    photoInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Hidden File Input for Avatar Photo */}
      <input
        type="file"
        ref={photoInputRef}
        accept="image/*"
        onChange={handlePhotoSelect}
        className="hidden"
      />

      {/* Top Profile Avatar Row */}
      <div className="flex items-center gap-4 bg-[#EBEBEB] border border-gray-300/60 rounded-xl p-5">
        <div
          onClick={handleChangePhoto}
          className="relative group cursor-pointer shrink-0"
          title="Click to change photo"
        >
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Profile Photo"
              className="w-16 h-16 rounded-full object-cover shadow-sm border-2 border-[#5B1B95]"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#5B1B95] text-white flex items-center justify-center font-bold text-xl tracking-wider shadow-sm">
              AM
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-semibold text-center p-1">
            Change
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-gray-900 leading-tight truncate">
            Alex Morgan
          </h2>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Property Manager · ProjexPro
          </p>
          <button
            type="button"
            onClick={handleChangePhoto}
            className="mt-2 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 rounded-xl px-3.5 py-1.5 transition-colors cursor-pointer"
          >
            Change Photo
          </button>
        </div>
      </div>

      {/* 1. Profile Information Box */}
      <div className="bg-[#EBEBEB] border border-gray-300/60 rounded-xl p-5 sm:p-6 space-y-4">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">
          Profile Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 focus:outline-none transition-all ${
                errors.firstName ? "border-red-500 bg-red-50/20" : "border-transparent focus:bg-white"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 focus:outline-none transition-all ${
                errors.lastName ? "border-red-500 bg-red-50/20" : "border-transparent focus:bg-white"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.lastName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Job Title / Department
            </label>
            <input
              type="text"
              name="jobTitle"
              value={profileData.jobTitle}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 focus:outline-none transition-all ${
                errors.email ? "border-red-500 bg-red-50/20" : "border-transparent focus:bg-white"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Phone Number *
            </label>
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 focus:outline-none transition-all ${
                errors.phone ? "border-red-500 bg-red-50/20" : "border-transparent focus:bg-white"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.phone}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 2. Registered Business Information Box */}
      <div className="bg-[#EBEBEB] border border-gray-300/60 rounded-xl p-5 sm:p-6 space-y-4">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">
          Registered Business Information
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Parent Company Name
            </label>
            <input
              type="text"
              name="parentCompanyName"
              value={profileData.parentCompanyName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Parent Company Address
            </label>
            <input
              type="text"
              name="parentCompanyAddress"
              value={profileData.parentCompanyAddress}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                City
              </label>
              <input
                type="text"
                name="city"
                value={profileData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                State
              </label>
              <input
                type="text"
                name="state"
                value={profileData.state}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={profileData.country}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                website address
              </label>
              <input
                type="text"
                name="website"
                value={profileData.website}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                name="businessPhone"
                value={profileData.businessPhone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Secondary Contact Information Box */}
      <div className="bg-[#EBEBEB] border border-gray-300/60 rounded-xl p-5 sm:p-6 space-y-4">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">
          Secondary Contact Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="secFullName"
              value={profileData.secFullName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Job Title / Department
            </label>
            <input
              type="text"
              name="secJobTitle"
              value={profileData.secJobTitle}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="secEmail"
              value={profileData.secEmail}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Phone Number
            </label>
            <input
              type="text"
              name="secPhone"
              value={profileData.secPhone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold px-6 py-3 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2 text-sm"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </form>
  );
}
