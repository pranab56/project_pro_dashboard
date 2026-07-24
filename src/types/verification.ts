export interface VerificationFormData {
  // Step 2: Contact Info
  fullName: string;
  jobTitle: string;
  businessEmail: string;
  contactNumber: string;

  // Step 3: Business Details
  companyName: string;
  legalName: string;
  dbaName: string;
  website: string;
  address: string;
  city: string;
  state: string;
  taxId: string;

  portfolioSize: string;
  maintenance: string;
  propertyTypes: string[];
}
