"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

export default function SecurityTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Current Password is required";
    }
    if (!newPassword) {
      newErrors.newPassword = "New Password is required";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (newPassword && newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    toast.success("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  return (
    <div className="bg-[#EBEBEB] border border-gray-300/60 rounded-xl p-6 sm:p-8 max-w-2xl">
      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-6 tracking-tight">
        Change Password
      </h3>

      <form onSubmit={handleUpdatePassword} className="space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
            Current Password *
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              if (e.target.value) setErrors((prev) => ({ ...prev, currentPassword: "" }));
            }}
            placeholder="••••••••••••"
            className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${
              errors.currentPassword ? "border-red-500 bg-red-50/20" : "border-transparent focus:bg-white"
            }`}
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
              <span>⚠️</span> {errors.currentPassword}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
            New Password *
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (e.target.value) setErrors((prev) => ({ ...prev, newPassword: "" }));
            }}
            placeholder="••••••••••••"
            className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${
              errors.newPassword ? "border-red-500 bg-red-50/20" : "border-transparent focus:bg-white"
            }`}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
              <span>⚠️</span> {errors.newPassword}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
            Confirm New Password *
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (e.target.value) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
            }}
            placeholder="••••••••••••"
            className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${
              errors.confirmPassword ? "border-red-500 bg-red-50/20" : "border-transparent focus:bg-white"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
              <span>⚠️</span> {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 px-6 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer shadow-xs"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}
