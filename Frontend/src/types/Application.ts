export type ApplicationStatus =
  | "new"
  | "reviewing"
  | "needs_information"
  | "eligible"
  | "not_eligible"
  | "accepted"
  | "reserve"
  | "rejected";

export type Application = {
  id?: string;

  courseId: string;
  courseName: string;

  firstName: string;
  lastName: string;
  personalNumber: string;
  email: string;
  phone: string;

  streetAddress: string;
  postalCode: string;
  city: string;

  highestEducation: string;
  currentOccupation: string;
  previousStudies?: string;

  hasBasicEligibility: boolean;
  eligibilityComment?: string;

  motivation: string;
  otherInformation?: string;

  acceptsPrivacyPolicy: boolean;

  status: ApplicationStatus;
  adminComment?: string;

  createdAt: string;
  updatedAt: string;
};