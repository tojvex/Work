import type { CSSProperties } from "react";

import type { ApplicationFormValues, FieldErrors } from "./types";

export const initialValues: ApplicationFormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  preferredPosition: "",
  preferredSchedule: "",
  preferredLocation: "",
  preferredStreets: [],
  privacyConsent: false,
};

export const initialFieldErrors: FieldErrors = {
  firstName: null,
  lastName: null,
  phone: null,
  preferredPosition: null,
  preferredSchedule: null,
  preferredLocation: null,
  preferredStreet: null,
};

export const createFieldErrorsState = (): FieldErrors => ({
  firstName: null,
  lastName: null,
  phone: null,
  preferredPosition: null,
  preferredSchedule: null,
  preferredLocation: null,
  preferredStreet: null,
});

export const inputBaseStyles =
  "w-full rounded-[9px] bg-[#d7d7d7] px-5 py-4 text-base placeholder:text-sm placeholder:text-[#0000003D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1DA94A] focus-visible:outline-offset-2 transition";

export const fieldGroupStyles = "flex flex-col gap-2";
export const fieldTitleClasses = "pl-1 text-base font-semibold text-[#000000]";
export const fieldTitleStyle: CSSProperties = { fontFamily: "var(--font-firago)" };
