"use client";

import React from "react";
import { Check, Shield } from "lucide-react";

interface VerificationSidebarProps {
  currentStep: number;
}

export default function VerificationSidebar({
  currentStep,
}: VerificationSidebarProps) {
  const stepsList = [
    { number: 1, title: "Welcome", desc: "Start your verification journey" },
    { number: 2, title: "Contact Info", desc: "Your personal & business details" },
    { number: 3, title: "Business Profile", desc: "Tell us about your portfolio" },
    { number: 4, title: "Review & Submit", desc: "Confirm before submission" },
  ];

  return (
    <div className="w-full md:w-80 lg:w-96 bg-[#4C127D] text-white p-6 md:p-10 flex flex-col justify-between shrink-0 relative overflow-hidden">
      {/* Subtle Decorative Circle Overlays */}
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />

      <div>
        {currentStep === 5 ? (
          <div className="mt-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-purple-900/60 border border-purple-400/40 flex items-center justify-center">
              <Shield className="w-8 h-8 text-purple-200" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Property Partner Verification
            </h2>
            <p className="text-xs text-purple-200/80 leading-relaxed font-normal">
              Your application is being reviewed by the platform administrator.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xs uppercase font-bold text-purple-200 tracking-wider mb-8">
              Verification Steps
            </h3>

            {/* Steps Timeline List */}
            <div className="space-y-7 relative">
              {/* Vertical connecting line */}
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-purple-900/80 -z-0" />

              {stepsList.map((st) => {
                const isCompleted = currentStep > st.number;
                const isCurrent = currentStep === st.number;

                return (
                  <div key={st.number} className="flex items-start gap-4 relative z-10">
                    {/* Step Circle / Checkmark */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                        isCompleted
                          ? "bg-emerald-500 text-white shadow-xs"
                          : isCurrent
                          ? "bg-white text-[#5B1B95] ring-4 ring-purple-300/30"
                          : "bg-purple-900/80 text-purple-300 border border-purple-700/50"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 text-white stroke-[3]" />
                      ) : (
                        st.number
                      )}
                    </div>

                    {/* Step Label */}
                    <div className="pt-0.5">
                      <h4
                        className={`text-sm font-semibold leading-tight ${
                          isCurrent
                            ? "text-white"
                            : isCompleted
                            ? "text-purple-200"
                            : "text-purple-300/60"
                        }`}
                      >
                        {st.title}
                      </h4>
                      {isCurrent && (
                        <p className="text-[11px] text-purple-200/80 mt-0.5">
                          {st.desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Footer info at bottom left */}
      <div className="pt-12 text-[11px] text-purple-300/70 font-medium">
        Property Services. Simplified.
      </div>
    </div>
  );
}
