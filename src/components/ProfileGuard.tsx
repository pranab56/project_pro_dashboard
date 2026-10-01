"use client";

import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useMyProfileQuery } from "../features/profile/profileApi";
import { getRedirectUrlForProfile } from "../utils/authRedirect";

interface ProfileGuardProps {
  children: ReactNode;
}

/**
 * ProfileGuard checks the user's profileCompletionPercentage.
 * If the profile is incomplete (< 100%), the user is redirected
 * to the appropriate verification page based on their role.
 * This prevents users from bypassing the verification flow
 * by manually navigating to dashboard URLs.
 */
export default function ProfileGuard({ children }: ProfileGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading, isError } = useMyProfileQuery(undefined);

  useEffect(() => {
    if (isLoading || isError) return;

    const profileData = data?.data || data;
    const completionPercentage = Number(profileData?.profileCompletionPercentage ?? 0);

    if (completionPercentage < 100) {
      const redirectUrl = getRedirectUrlForProfile(profileData);

      // Avoid redirect loop — only redirect if we're not already on the verification page
      if (pathname !== redirectUrl) {
        router.replace(redirectUrl);
      }
    }
  }, [data, isLoading, isError, router, pathname]);

  // Show nothing while loading profile to prevent flash of dashboard content
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#6B1294]"></div>
      </div>
    );
  }

  // If profile is incomplete, don't render dashboard children (redirect will happen via useEffect)
  if (!isError) {
    const profileData = data?.data || data;
    const completionPercentage = Number(profileData?.profileCompletionPercentage ?? 0);
    if (completionPercentage < 100) {
      const redirectUrl = getRedirectUrlForProfile(profileData);
      if (pathname !== redirectUrl) {
        return null;
      }
    }
  }

  return <>{children}</>;
}
