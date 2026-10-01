"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { VerificationFormData, IServiceProviderProfile } from "@/types/verification";
import { useMyProfileQuery, useUpdateProfileByServiceProviderMutation } from "@/features/profile/profileApi";
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

const yearsToLabel = (years?: number): string => {
  if (!years) return "";
  if (years <= 3) return "1-3 Years";
  if (years <= 5) return "3-5 Years";
  if (years <= 10) return "5-10 Years";
  return "10+ Years";
};

export default function VerificationPage() {
  const router = useRouter();

  // Fetch current user profile to determine role and pre-fill form
  const { data: profileRes, isLoading: isProfileLoading } = useMyProfileQuery(undefined);
  const profileData = profileRes?.data || profileRes;
  const userRole = profileData?.role;
  const isServiceProvider = userRole === "service_provider" || userRole === "provider";

  // Update profile mutation
  const [updateProfile, { isLoading: isSubmitting }] = useUpdateProfileByServiceProviderMutation();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isProfilePreFilled, setIsProfilePreFilled] = useState<boolean>(false);

  const [selectedPlan, setSelectedPlan] = useState<SelectedPlanInfo>({
    id: "plan-pro",
    name: "ProjexPro Pro",
    pricePerUnit: 2.0,
    monthlyMinimum: 2000,
    activeUnits: 1250,
    estimatedTotal: 2500,
  });

  const [formData, setFormData] = useState<VerificationFormData>({
    // Step 2
    fullName: "",
    jobTitle: "",
    businessEmail: "",
    contactNumber: "",

    // Step 3 common
    companyName: "",
    legalName: "",
    dbaName: "",
    website: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    taxId: "",

    // Property Manager Specific (unused but present in type)
    portfolioSize: "",
    maintenance: "",
    propertyTypes: [],

    // Service Provider new fields
    bio: "",
    skills: [],
    officeAddress: "",
    officeCity: "",
    officeState: "",
    officeZipCode: "",
    officePhone: "",

    // Service Provider Specific - Years & Licenses
    yearsInBusiness: "",
    serviceRadius: "",
    serviceCategories: [],
    licenseNumber: "",
    licenses: [],

    // Uploads
    profileImage: null,
    governmentIdFile: null,
    proofOfInsuranceFile: null,
    additionalDocuments: [],
  });

  // Pre-fill form data from profile API response
  useEffect(() => {
    if (!profileData || isProfilePreFilled) return;
    const profile: IServiceProviderProfile = profileData?.profile || {};

    setFormData((prev) => ({
      ...prev,
      fullName: [profileData?.firstName, profileData?.lastName].filter(Boolean).join(" ") || prev.fullName,
      jobTitle: (profile as any)?.jobTitle || prev.jobTitle,
      businessEmail: profileData?.email || prev.businessEmail,
      contactNumber: profile.officePhone || profileData?.contactNumber || profileData?.phone || prev.contactNumber,

      companyName: profile.companyName || prev.companyName,
      legalName: prev.legalName,
      dbaName: prev.dbaName,
      website: prev.website,
      address: profile.streetAddress || profile.officeAddress || prev.address,
      city: profile.city || profile.officeCity || prev.city,
      state: profile.state || profile.officeState || prev.state,
      zipCode: profile.zipCode || profile.officeZipCode || prev.zipCode,
      taxId: profile.taxId || prev.taxId,

      bio: profile.bio || prev.bio,
      skills: profile.skills || prev.skills,
      serviceCategories: profile.skills || prev.serviceCategories,

      officeAddress: profile.officeAddress || prev.officeAddress,
      officeCity: profile.officeCity || prev.officeCity,
      officeState: profile.officeState || prev.officeState,
      officeZipCode: profile.officeZipCode || prev.officeZipCode,
      officePhone: profile.officePhone || prev.officePhone,

      yearsInBusiness: profile.yearsInBusiness ? yearsToLabel(profile.yearsInBusiness) : prev.yearsInBusiness,

      profileImage: (profileData?.image as any) || (profile as any)?.imageUrl || prev.profileImage,
      governmentIdFile: profile.governmentId as any || prev.governmentIdFile,
      proofOfInsuranceFile: profile.proofOfInsurance as any || prev.proofOfInsuranceFile,
      additionalDocuments: (profile.documents || []).map((d, i) => ({
        title: d.title || `Document ${i + 1}`,
        fileUrl: d.fileUrl,
        type: d.type,
        file: null,
      })),
    }));

    setIsProfilePreFilled(true);
  }, [profileData, isProfilePreFilled]);

  // Persist and restore step on reload
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const savedStep = localStorage.getItem("projexpro_sp_verification_step");
      if (savedStep) {
        const parsed = parseInt(savedStep, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= 8) {
          setCurrentStep(parsed);
        }
      }

      const savedPlan = localStorage.getItem("projexpro_sp_verification_plan");
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
      localStorage.setItem("projexpro_sp_verification_step", String(step));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  };

  const handleUpdateForm = (updater: (prev: VerificationFormData) => VerificationFormData) => {
    setFormData((prev) => {
      const updated = updater(prev);
      return updated;
    });
  };

  const handleSubmitApplication = async () => {
    try {
      const nameParts = formData.fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const yearsNumMatch = formData.yearsInBusiness?.match(/(\d+)/);
      const yearsInBusinessNumber = yearsNumMatch ? parseInt(yearsNumMatch[1], 10) : 0;

      const skills = (formData.skills?.length ? formData.skills : formData.serviceCategories || []) as string[];

      const dataPayload = {
        firstName,
        lastName,
        phone: formData.contactNumber,
        profile: {
          streetAddress: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode || "",
          bio: formData.bio || "",
          skills,
          companyName: formData.companyName,
          officeAddress: formData.officeAddress || formData.address,
          officeCity: formData.officeCity || formData.city,
          officeState: formData.officeState || formData.state,
          officeZipCode: formData.officeZipCode || formData.zipCode || "",
          officePhone: formData.officePhone || formData.contactNumber,
          taxId: formData.taxId,
          yearsInBusiness: yearsInBusinessNumber,
        },
      };

      // Build FormData (multipart) to match Postman body format:
      // image, governmentId, proofOfInsurance as file fields
      // documents as repeated file fields (or separate)
      // data as JSON text field
      const hasAnyFile =
        formData.profileImage instanceof File ||
        formData.governmentIdFile instanceof File ||
        formData.proofOfInsuranceFile instanceof File ||
        (formData.additionalDocuments || []).some((d) => d.file instanceof File);

      let apiPayload: any;

      if (hasAnyFile) {
        const fd = new FormData();
        if (formData.profileImage instanceof File) fd.append("image", formData.profileImage);
        if (formData.governmentIdFile instanceof File) fd.append("governmentId", formData.governmentIdFile);
        if (formData.proofOfInsuranceFile instanceof File)
          fd.append("proofOfInsurance", formData.proofOfInsuranceFile);

        (formData.additionalDocuments || []).forEach((doc, idx) => {
          if (doc.file instanceof File) {
            fd.append(`documents`, doc.file);
            fd.append(`documentTitles`, doc.title || `Document ${idx + 1}`);
          }
        });

        fd.append("data", JSON.stringify(dataPayload));
        apiPayload = fd;
      } else {
        apiPayload = dataPayload;
      }

      const res = await updateProfile(apiPayload).unwrap();

      if (res?.success || res?.statusCode === 200) {
        toast.success(res?.message || "Application submitted! Admin review in progress...");
        updateStep(5);
      } else {
        toast.error(res?.message || "Failed to submit application. Please try again.");
      }
    } catch (error: any) {
      console.error("Profile update error:", error);
      const errorMessage =
        error?.data?.message || error?.message || "Failed to submit application. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleSelectPlan = (plan: SelectedPlanInfo) => {
    setSelectedPlan(plan);
    if (typeof window !== "undefined") {
      localStorage.setItem("projexpro_sp_verification_plan", JSON.stringify(plan));
    }
    updateStep(8);
  };

  const handlePaymentSuccess = () => {
    toast.success("Payment Successful! ProjexPro Workspace Activated.");
    if (typeof window !== "undefined") {
      localStorage.removeItem("projexpro_sp_verification_step");
      localStorage.removeItem("projexpro_sp_verification_form_data");
      localStorage.removeItem("projexpro_sp_verification_plan");
    }
    router.push("/service-requests");
  };

  if (!isMounted) return null;
  if (isProfileLoading && !isProfilePreFilled) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#6B1294]"></div>
          <p className="text-sm text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#F9FAFB]">
      <VerificationSidebar currentStep={Math.min(currentStep, 4)} isServiceProvider={isServiceProvider} />

      <div className="flex-1 flex flex-col min-h-screen">
        <VerificationHeaderNav />

        <div className="p-4 sm:p-8 md:p-10 flex-1">
          {currentStep === 1 && (
            <Step1Welcome onContinue={() => updateStep(2)} isServiceProvider={isServiceProvider} />
          )}

          {currentStep === 2 && (
            <Step2ContactInfo
              formData={formData}
              onChange={handleInputChange}
              onBack={() => updateStep(1)}
              onNext={() => updateStep(3)}
              isServiceProvider={isServiceProvider}
            />
          )}

          {currentStep === 3 && (
            <Step3BusinessDetails
              formData={formData}
              onChange={handleInputChange}
              onUpdateForm={handleUpdateForm}
              onBack={() => updateStep(2)}
              onNext={() => updateStep(4)}
              isServiceProvider={isServiceProvider}
            />
          )}

          {currentStep === 4 && (
            <Step4ReviewSubmit
              formData={formData}
              onEditStep={(st) => updateStep(st)}
              onBack={() => updateStep(3)}
              onSubmit={handleSubmitApplication}
              isServiceProvider={isServiceProvider}
              isSubmitting={isSubmitting}
            />
          )}

          {currentStep === 5 && <Step5StatusPending formData={formData} />}

          {currentStep === 6 && (
            <Step6AccountApproved
              contactName={formData.fullName}
              onChoosePlan={() => updateStep(7)}
            />
          )}

          {currentStep === 7 && (
            <Step7ChoosePlan
              portfolioSizeText={formData.portfolioSize}
              onSelectPlan={handleSelectPlan}
            />
          )}

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
