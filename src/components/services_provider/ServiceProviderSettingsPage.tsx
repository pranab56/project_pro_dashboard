"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { AlertTriangle, Lock, Shield, X } from "lucide-react";

export default function ServiceProviderSettingsPage(): React.ReactElement {
  // Password Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

  // Account Status State
  const [isAccountPaused, setIsAccountPaused] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};
    if (!currentPassword) {
      errors.currentPassword = "Current Password is required";
    }
    if (!newPassword) {
      errors.newPassword = "New Password is required";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (newPassword && newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    toast.success("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordErrors({});
  };

  const handleTogglePause = () => {
    const nextState = !isAccountPaused;
    setIsAccountPaused(nextState);
    if (nextState) {
      toast.success("Account paused. Incoming job requests are temporarily stopped.");
    } else {
      toast.success("Account active. You are now receiving job requests.");
    }
  };

  const handleConfirmDeactivate = () => {
    toast.error("Account deactivation requested. Our support team will process your request.");
    setIsDeactivateModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1">
          Manage your password, account security, and availability status.
        </p>
      </div>

      {/* 1. Change Password Box */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl overflow-hidden max-w-2xl shadow-xs">
        {/* Card Top Banner Header */}
        <div className="bg-gray-100/70 border-b border-gray-300/50 px-6 py-4 flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#6B1294]" />
            <span>Change Password</span>
          </h2>
        </div>

        {/* Card Body Form */}
        <form onSubmit={handleUpdatePassword} className="p-6 sm:p-7 space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                if (e.target.value) setPasswordErrors((p) => ({ ...p, currentPassword: "" }));
              }}
              placeholder="••••••••••••"
              className={`w-full h-[46px] px-4 py-3 bg-white border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${
                passwordErrors.currentPassword
                  ? "border-red-500 bg-red-50/20"
                  : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
              }`}
            />
            {passwordErrors.currentPassword && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {passwordErrors.currentPassword}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (e.target.value) setPasswordErrors((p) => ({ ...p, newPassword: "" }));
              }}
              placeholder="••••••••••••"
              className={`w-full h-[46px] px-4 py-3 bg-white border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${
                passwordErrors.newPassword
                  ? "border-red-500 bg-red-50/20"
                  : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
              }`}
            />
            {passwordErrors.newPassword && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {passwordErrors.newPassword}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (e.target.value) setPasswordErrors((p) => ({ ...p, confirmPassword: "" }));
              }}
              placeholder="••••••••••••"
              className={`w-full h-[46px] px-4 py-3 bg-white border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${
                passwordErrors.confirmPassword
                  ? "border-red-500 bg-red-50/20"
                  : "border-gray-300 focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
              }`}
            />
            {passwordErrors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {passwordErrors.confirmPassword}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-[#5B1B95] hover:bg-[#4C127D] text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer shadow-xs"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* 2. Account Status Box */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 max-w-2xl space-y-4 shadow-xs">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#6B1294] tracking-tight flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#6B1294]" />
            <span>Account Status</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
            Manage your availability status and platform access.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Action Card A: Pause Account */}
          <div className="bg-[#E2E2E5]/50 border border-gray-300/60 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  Pause Account
                </h3>
                {/* Purple Toggle Switch */}
                <button
                  type="button"
                  onClick={handleTogglePause}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors cursor-pointer relative shrink-0 ${
                    isAccountPaused ? "bg-[#6B1294]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform transform ${
                      isAccountPaused ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <p className="text-xs text-gray-500 font-normal mt-3 leading-relaxed">
                Temporarily Pause incoming job requests while you are away. Toggle back on when you are ready to start back working.
              </p>
            </div>
          </div>

          {/* Action Card B: Deactivate Account */}
          <div className="bg-[#E2E2E5]/50 border border-gray-300/60 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <button
                type="button"
                onClick={() => setIsDeactivateModalOpen(true)}
                className="bg-[#C62828] hover:bg-[#B71C1C] text-white font-semibold px-4 py-2 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer w-fit shadow-2xs"
              >
                Deactivate Account
              </button>

              <p className="text-xs text-gray-500 font-normal mt-3.5 leading-relaxed">
                Permanently close your ProjexPro account. This action cannot be reverse once done.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deactivate Confirmation Modal */}
      {isDeactivateModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-[#E5E7EB] relative space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                <h2 className="text-lg font-bold text-gray-900">
                  Deactivate Account
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsDeactivateModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
              Are you sure you want to deactivate your ProjexPro account? You will lose access to all active jobs, payout history, and property care services.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsDeactivateModalOpen(false)}
                className="flex-1 py-2.5 px-4 bg-white hover:bg-gray-100 border border-gray-300 rounded-xl text-gray-800 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeactivate}
                className="flex-1 py-2.5 px-4 bg-[#C62828] hover:bg-[#B71C1C] text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer shadow-2xs"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
