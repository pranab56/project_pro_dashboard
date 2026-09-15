"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { VerificationFormData } from "@/types/verification";
import VerificationSidebar from "@/components/verification/VerificationSidebar";
import VerificationHeaderNav from "@/components/verification/VerificationHeaderNav";
import Step1Welcome from "@/components/verification/Step1Welcome";
import Step2ContactInfo from "@/components/verification/Step2ContactInfo";
import Step3BusinessDetails from "@/components/verification/Step3BusinessDetails";
import Step4ReviewSubmit from "@/components/verification/Step4ReviewSubmit";
import Step5StatusPending from "@/components/verification/Step5StatusPending";
import Step6AccountApproved from "@/components/verification/Step6AccountApproved";
import Step7ChoosePlan, { SelectedPlanInfo } from "@/components/verification/Step7ChoosePlan";
import Step8BillingActivation from "@/components/verification/Step8BillingActivation";

export default function VerificationPage() {
  const router = useRouter();

  // Current Step:
  // 1 = Welcome, 2 = Contact Details, 3 = Business Details, 4 = Review & Submit
  // 5 = Admin Review Pending, 6 = Account Approved (Image 1), 7 = Choose Plan, 8 = Billing & Activation (Image 2)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Selected Plan state
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlanInfo>({
    id: "plan-pro",
    name: "ProjexPro Pro",
    pricePerUnit: 2.0,
    monthlyMinimum: 2000,
    activeUnits: 1250,
    estimatedTotal: 2500,
  });

  // Form State
  const [formData, setFormData] = useState<VerificationFormData>({
    // Step 2: Contact Info
    fullName: "Alex Morgan",
    jobTitle: "Property Manager",
    businessEmail: "alex.morgan@yourcompany.com",
    contactNumber: "(555) 123-4567",

    // Step 3: Business Details
    companyName: "Acme Property Management",
    legalName: "Acme Property Management LLC",
    dbaName: "Acme Property Management",
    website: "https://acmeproperty.com",
    address: "123 Main Street, Suite 400",
    city: "Austin",
    state: "TX",
    taxId: "XX-XXXXXXX",

    portfolioSize: "1,000 - 15,000 Units",
    maintenance: "No, we outsource all maintenance to third-party vendors.",
    propertyTypes: ["Single-Family Homes", "Multi-Family Units"],
  });

  // Persist and restore step on reload
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const savedStep = localStorage.getItem("projexpro_verification_step");
      if (savedStep) {
        const parsed = parseInt(savedStep, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= 8) {
          setCurrentStep(parsed);
        }
      }

      const savedForm = localStorage.getItem("projexpro_verification_form_data");
      if (savedForm) {
        try {
          setFormData(JSON.parse(savedForm));
        } catch (e) {
          console.error("Error parsing saved form data", e);
        }
      }

      const savedPlan = localStorage.getItem("projexpro_verification_plan");
      if (savedPlan) {
        try {
          setSelectedPlan(JSON.parse(savedPlan));
        } catch (e) {
          console.error("Error parsing saved plan", e);
        }
      }
    }
  }, []);

  const updateStep = (step: number) => {
    setCurrentStep(step);
    if (typeof window !== "undefined") {
      localStorage.setItem("projexpro_verification_step", String(step));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (typeof window !== "undefined") {
        localStorage.setItem("projexpro_verification_form_data", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleUpdateForm = (updater: (prev: VerificationFormData) => VerificationFormData) => {
    setFormData((prev) => {
      const updated = updater(prev);
      if (typeof window !== "undefined") {
        localStorage.setItem("projexpro_verification_form_data", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleSubmitApplication = () => {
    toast.success("Application submitted! Admin review in progress...");
    updateStep(5);
  };

  const handleSelectPlan = (plan: SelectedPlanInfo) => {
    setSelectedPlan(plan);
    if (typeof window !== "undefined") {
      localStorage.setItem("projexpro_verification_plan", JSON.stringify(plan));
    }
    updateStep(8);
  };

  const handlePaymentSuccess = () => {
    toast.success("Payment Successful! ProjexPro Workspace Activated.");
    if (typeof window !== "undefined") {
      localStorage.removeItem("projexpro_verification_step");
      localStorage.removeItem("projexpro_verification_form_data");
      localStorage.removeItem("projexpro_verification_plan");
    }
    router.push("/service-requests");
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#F9FAFB]">
      {/* LEFT SIDEBAR PANEL */}
      <VerificationSidebar currentStep={Math.min(currentStep, 4)} />

      {/* RIGHT CONTENT PANEL */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header Nav */}
        <VerificationHeaderNav />

        <div className="p-4 sm:p-8 md:p-10 flex-1">
          {/* STEP 1: WELCOME */}
          {currentStep === 1 && (
            <Step1Welcome onContinue={() => updateStep(2)} />
          )}

          {/* STEP 2: CONTACT DETAILS */}
          {currentStep === 2 && (
            <Step2ContactInfo
              formData={formData}
              onChange={handleInputChange}
              onBack={() => updateStep(1)}
              onNext={() => updateStep(3)}
            />
          )}

          {/* STEP 3: BUSINESS DETAILS */}
          {currentStep === 3 && (
            <Step3BusinessDetails
              formData={formData}
              onChange={handleInputChange}
              onUpdateForm={handleUpdateForm}
              onBack={() => updateStep(2)}
              onNext={() => updateStep(4)}
            />
          )}

          {/* STEP 4: REVIEW & SUBMIT */}
          {currentStep === 4 && (
            <Step4ReviewSubmit
              formData={formData}
              onEditStep={(st) => updateStep(st)}
              onBack={() => updateStep(3)}
              onSubmit={handleSubmitApplication}
            />
          )}

          {/* STEP 5: ADMIN REVIEW IN PROGRESS */}
          {currentStep === 5 && (
            <Step5StatusPending
              formData={formData}
              onAdminApproved={() => updateStep(6)}
            />
          )}

          {/* STEP 6: ACCOUNT APPROVED (IMAGE 1) */}
          {currentStep === 6 && (
            <Step6AccountApproved
              contactName={formData.fullName}
              onChoosePlan={() => updateStep(7)}
            />
          )}

          {/* STEP 7: CHOOSE PLAN (SUPER ADMIN PLANS) */}
          {currentStep === 7 && (
            <Step7ChoosePlan
              portfolioSizeText={formData.portfolioSize}
              onSelectPlan={handleSelectPlan}
            />
          )}

          {/* STEP 8: BILLING & ACTIVATION (IMAGE 2) */}
          {currentStep === 8 && (
            <Step8BillingActivation
              selectedPlan={selectedPlan}
              contactName={formData.fullName}
              contactEmail={formData.businessEmail}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
}
