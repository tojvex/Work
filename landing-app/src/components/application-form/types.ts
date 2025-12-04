import { type ResolvedPositionOption } from "@/data/applicationOptions";

export type ApplicationFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  preferredPosition: string;
  preferredSchedule: string;
  preferredLocation: string;
  preferredStreets: string[];
  privacyConsent: boolean;
};

export type ApplicationSubmissionPayload = Omit<
  ApplicationFormValues,
  "privacyConsent"
>;

export type FieldErrors = {
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  preferredPosition: string | null;
  preferredSchedule: string | null;
  preferredLocation: string | null;
  preferredStreet: string | null;
};

export type ApplicationFormStatus = "idle" | "submitting" | "success" | "error";

export type ApplicationFormProps = {
  positionOptions: ResolvedPositionOption[];
  scheduleOptions: string[];
  locationOptions: string[];
};
