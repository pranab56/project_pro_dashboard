"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { VerificationFormData } from "@/types/verification";
import VerificationSidebar from "@/components/verification/VerificationSidebar";
import VerificationHeaderNav from "@/components/verification/VerificationHeaderNav";
import Step1Welcome from "@/components/verification/Step1Welcome";
import Step2ContactInfo from "@/components/verification/Step2ContactInfo";
import Step3BusinessDetails from "@/components/verification/Step3BusinessDetails";
import Step4ReviewSubmit from "@/components/verification/Step4ReviewSubmit";
import Step5StatusPending from "@/components/verification/Step5StatusPending";

export default function VerificationPage() {
  // Current Step: 1 = Welcome, 2 = Contact Info, 3 = Business Profile, 4 = Review & Submit, 5 = Status (Submitted)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [formData, setFormData] = useState<VerificationFormData>({
    // Step 2: Contact Info
    fullName: "Alex Morgan",
    jobTitle: "Property Manager",
    businessEmail: "alex@yourcompany.com",
    contactNumber: "+1 (555) 234-5678",

    // Step 3: Business Details
    companyName: "Acme Property Management",
    legalName: "Acme Property Management LLC",
    dbaName: "Acme Property Management",
    website: "https://acmeproperty.com",
    address: "123 Business Blvd, Suite 400",
    city: "Los Angeles",
    state: "CA",
    taxId: "XX-XXXXXXX",

    portfolioSize: "1-10 Units",
    maintenance: "No, we outsource all maintenance to third-party vendors.",
    propertyTypes: ["Single-Family Homes"],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitApplication = () => {
    toast.success("Application submitted successfully for review!");
    setCurrentStep(5);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#EBEBEB]">
      {/* LEFT SIDEBAR PANEL */}
      <VerificationSidebar currentStep={currentStep} />

      {/* RIGHT CONTENT PANEL */}
      <div className="flex-1 flex flex-col ">
        {/* Top Header Nav */}
        <VerificationHeaderNav />

        <div className="p-4 sm:p-8 md:p-10 flex-1">
          {/* STEP 1: WELCOME */}
        {currentStep === 1 && (
          <Step1Welcome onContinue={() => setCurrentStep(2)} />
        )}

        {/* STEP 2: CONTACT INFORMATION */}
        {currentStep === 2 && (
          <Step2ContactInfo
            formData={formData}
            onChange={handleInputChange}
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        )}

        {/* STEP 3: BUSINESS DETAILS */}
        {currentStep === 3 && (
          <Step3BusinessDetails
            formData={formData}
            onChange={handleInputChange}
            onUpdateForm={setFormData}
            onBack={() => setCurrentStep(2)}
            onNext={() => setCurrentStep(4)}
          />
        )}

        {/* STEP 4: REVIEW & SUBMIT */}
        {currentStep === 4 && (
          <Step4ReviewSubmit
            formData={formData}
            onEditStep={(st) => setCurrentStep(st)}
            onBack={() => setCurrentStep(3)}
            onSubmit={handleSubmitApplication}
          />
        )}

        {/* STEP 5: APPLICATION STATUS (PENDING REVIEW) */}
        {currentStep === 5 && (
          <Step5StatusPending
            formData={formData}
            onEdit={() => setCurrentStep(4)}
            onReset={() => setCurrentStep(1)}
          />
        )}
        </div>
      </div>
    </div>
  );
}
