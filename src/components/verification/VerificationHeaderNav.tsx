"use client";

import Image from "next/image";

function ProjexProLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <Image
        src="/logo/logo.png"
        alt="ProjexPro Logo"
        width={1000}
        height={1000}
        className="h-15 w-auto object-contain"
        priority
      />
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
