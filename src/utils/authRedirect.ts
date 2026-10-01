/**
 * Helper function to determine the appropriate redirect URL based on user role
 * and profileCompletionPercentage status.
 */
export const getRedirectUrlForProfile = (profile: any): string => {
  const role = profile?.role; // 'service_provider' | 'property_manager' | 'provider' | 'manager'
  const completionPercentage = Number(profile?.profileCompletionPercentage ?? 0);

  const isServiceProvider = role === "service_provider" || role === "provider";
  const isPropertyManager = role === "property_manager" || role === "manager";

  if (completionPercentage < 100) {
    if (isServiceProvider) {
      return "/service-provider/verification";
    }
    if (isPropertyManager) {
      return "/provider-manager/verification";
    }
    // Fallback for unknown roles with incomplete profile
    return "/provider-manager/verification";
  } else {
    // Onboarding is complete (100%)
    if (isServiceProvider) {
      return "/services_provider/overview";
    } else {
      return "/";
    }
  }
};
