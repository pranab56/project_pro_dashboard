"use client";

import React from "react";

function ProjexProLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="34"
        height="34"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M22 4L4 17.5H12L22 10L32 17.5H40L22 4Z" fill="#FF9F00" />
        <path d="M22 13L8 23.5H16L22 19L28 23.5H36L22 13Z" fill="#F59E0B" />
        <path d="M22 22L12 29.5H19.5L22 27.6L24.5 29.5H32L22 22Z" fill="#D97706" />
      </svg>
      <div className="flex items-center text-xl font-bold tracking-tight">
        <span className="text-[#5B1B95]">Projex</span>
        <span className="text-[#A327EE]">Pro</span>
      </div>
    </div>
  );
}

export default function VerificationHeaderNav() {
  return (
    <div className="flex items-center justify-between  border-b border-gray-300/50 p-6">
      <ProjexProLogo />
      <span className="text-xs text-gray-500 font-medium">
        Need help?{" "}
        <a
          href="mailto:support@projexpro.com"
          className="text-[#6B1294] font-semibold hover:underline"
        >
          Contact Support
        </a>
      </span>
    </div>
  );
}
