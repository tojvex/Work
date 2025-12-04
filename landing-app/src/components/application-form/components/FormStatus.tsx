import { applicationFormCopy } from "../copy";
import type { ApplicationFormStatus } from "../types";

type FormStatusProps = {
  status: ApplicationFormStatus;
  errorMessage: string | null;
};

export const FormStatus = ({ status, errorMessage }: FormStatusProps) => {
  if (status === "error" && errorMessage) {
    return <p className="text-sm text-red-600">{errorMessage}</p>;
  }

  if (status === "success") {
    return <p className="text-sm text-[#1DA94A]">{applicationFormCopy.success}</p>;
  }

  return null;
};
