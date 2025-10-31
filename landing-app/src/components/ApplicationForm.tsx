"use client";

import { useEffect, useState, type CSSProperties } from "react";

type ApplicationFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  preferredPosition: string;
  preferredSchedule: string;
  preferredLocation: string;
  privacyConsent: boolean;
};

type ApplicationSubmissionPayload = Omit<
  ApplicationFormValues,
  "privacyConsent"
>;

type FieldErrors = {
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
};

const initialValues: ApplicationFormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  preferredPosition: "",
  preferredSchedule: "",
  preferredLocation: "",
  privacyConsent: false,
};

const inputBaseStyles =
  "w-full rounded-[9px] bg-[#d7d7d7] px-5 py-4 text-base placeholder:text-sm placeholder:text-[#0000003D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1DA94A] focus-visible:outline-offset-2 transition";

const fieldGroupStyles = "flex flex-col gap-2";
const fieldTitleClasses = "pl-1 text-base font-semibold text-[#000000]";
const fieldTitleStyle: CSSProperties = { fontFamily: "var(--font-firago)" };

type ApplicationFormProps = {
  positionOptions: string[];
  scheduleOptions: string[];
  locationOptions: string[];
};

export default function ApplicationForm({
  positionOptions,
  scheduleOptions,
  locationOptions,
}: ApplicationFormProps) {
  const [values, setValues] = useState<ApplicationFormValues>(initialValues);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // NEW: field-level errors state
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({
    firstName: null,
    lastName: null,
    phone: null,
  });

  useEffect(() => {
    setValues((prev) => {
      const next = { ...prev };
      if (next.preferredPosition && !positionOptions.includes(next.preferredPosition)) {
        next.preferredPosition = "";
      }
      if (next.preferredSchedule && !scheduleOptions.includes(next.preferredSchedule)) {
        next.preferredSchedule = "";
      }
      if (next.preferredLocation && !locationOptions.includes(next.preferredLocation)) {
        next.preferredLocation = "";
      }
      return next;
    });
  }, [positionOptions, scheduleOptions, locationOptions]);

  const handleFieldChange = (
    field: keyof ApplicationFormValues,
    value: string | boolean,
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear the error for this field as user edits
    if (field === "firstName" || field === "lastName" || field === "phone") {
      setFieldErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setFieldErrors({ firstName: null, lastName: null, phone: null });
  };

  // NEW: validation helper
  const validateFields = (v: ApplicationFormValues): FieldErrors => {
    const errors: FieldErrors = { firstName: null, lastName: null, phone: null };

    // Only letters (Unicode letters), no spaces/symbols
    const lettersOnly = /^[\p{L}]+$/u;

    if (!v.firstName.trim()) {
      errors.firstName = "Required";
    } else if (!lettersOnly.test(v.firstName.trim())) {
      errors.firstName = "ჩაწერეთ მხოლოდ ტექსტი";
    }

    if (!v.lastName.trim()) {
      errors.lastName = "Required";
    } else if (!lettersOnly.test(v.lastName.trim())) {
      errors.lastName = "ჩაწერეთ მხოლოდ ტექსტი";
    }

    // Exactly 9 digits, no symbols/spaces
    const phoneDigits = /^\d{9}$/;
    if (!v.phone.trim()) {
      errors.phone = "Required";
    } else if (!phoneDigits.test(v.phone.trim())) {
      errors.phone = "ჩაწერეთ ზუსტად 9 ნიშნა ნომერი";
    }

    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateFields(values);
    setFieldErrors(nextErrors);

    if (nextErrors.firstName || nextErrors.lastName || nextErrors.phone) {
      setErrorMessage("გთხოვთ შეასწოროთ გაწითლებული ველი");
      setStatus("error");
      return;
    }

    if (!values.privacyConsent) {
      setErrorMessage("Please agree to the placeholder consent text.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const submissionPayload: ApplicationSubmissionPayload = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        phone: values.phone.trim(),
        preferredPosition: values.preferredPosition,
        preferredSchedule: values.preferredSchedule,
        preferredLocation: values.preferredLocation,
      };

      const response = await fetch("/api/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionPayload),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const message =
          payload?.message ??
          payload?.error ??
          "Unable to submit the form right now.";
        throw new Error(message);
      }

      setStatus("success");
      resetForm();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error occurred.";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  // Helper: color for placeholder vs selected options
  const selectColor = (hasValue: boolean) =>
    hasValue ? "#004E1B" : "rgba(0, 0, 0, 0.24)";

  return (
    <form
      className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-[26px] bg-white/70 px-10 py-6 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur"
      onSubmit={handleSubmit}
    >
      <div className="mb-2 text-center">
        <p className="text-base font-medium" style={{ color: "rgba(0, 0, 0, 0.38)" }}>
          გთხოვთ შეავსოთ ქვემოთ მოცემული ფორმა
        </p>
      </div>

      <label
        htmlFor="application-first-name"
        className={`${fieldGroupStyles} text-sm`}
      >
        <span className={fieldTitleClasses} style={fieldTitleStyle}>სახელი</span>
        <input
          id="application-first-name"
          type="text"
          name="firstName"
          autoComplete="given-name"
          placeholder="ჩაწერე სახელი"
          className={`${inputBaseStyles} text-[#202020] ${fieldErrors.firstName ? "outline outline-red-500" : ""}`}
          value={values.firstName}
          onChange={(event) =>
            handleFieldChange("firstName", event.currentTarget.value)
          }
          required
          aria-invalid={!!fieldErrors.firstName}
          aria-errormessage={fieldErrors.firstName ? "firstName-error" : undefined}
        />
        {fieldErrors.firstName && (
          <span id="firstName-error" className="pl-1 text-xs text-red-600">
            {fieldErrors.firstName}
          </span>
        )}
      </label>

      <label
        htmlFor="application-last-name"
        className={`${fieldGroupStyles} text-sm`}
      >
        <span className={fieldTitleClasses} style={fieldTitleStyle}>გვარი</span>
        <input
          id="application-last-name"
          type="text"
          name="lastName"
          autoComplete="family-name"
          placeholder="ჩაწერე გვარი"
          className={`${inputBaseStyles} text-[#202020] ${fieldErrors.lastName ? "outline outline-red-500" : ""}`}
          value={values.lastName}
          onChange={(event) =>
            handleFieldChange("lastName", event.currentTarget.value)
          }
          required
          aria-invalid={!!fieldErrors.lastName}
          aria-errormessage={fieldErrors.lastName ? "lastName-error" : undefined}
        />
        {fieldErrors.lastName && (
          <span id="lastName-error" className="pl-1 text-xs text-red-600">
            {fieldErrors.lastName}
          </span>
        )}
      </label>

      <label
        htmlFor="application-phone"
        className={`${fieldGroupStyles} text-sm`}
      >
        <span className={fieldTitleClasses} style={fieldTitleStyle}>ნომერი</span>
        <input
          id="application-phone"
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder="ჩაწერე 9 ციფრი (მაგ. 5XXXXXXXX)"
          className={`${inputBaseStyles} text-[#202020] ${fieldErrors.phone ? "outline outline-red-500" : ""}`}
          value={values.phone}
          onChange={(event) => {
            const digitsOnly = event.currentTarget.value
              .replace(/\D/g, "")
              .slice(0, 9);
            handleFieldChange("phone", digitsOnly);
          }}
          required
          inputMode="numeric"
          pattern="\d{9}"
          maxLength={9}
          aria-invalid={!!fieldErrors.phone}
          aria-errormessage={fieldErrors.phone ? "phone-error" : undefined}
        />
        {fieldErrors.phone && (
          <span id="phone-error" className="pl-1 text-xs text-red-600">
            {fieldErrors.phone}
          </span>
        )}
      </label>

      <label
        htmlFor="application-position"
        className={`${fieldGroupStyles} text-sm`}
      >
        <span className={fieldTitleClasses} style={fieldTitleStyle}>სასურველი პოზიცია</span>
        <div className="relative">
          <select
            id="application-position"
            name="preferredPosition"
            className={`${inputBaseStyles} appearance-none pr-12`}
            style={{
              color: values.preferredPosition
                ? "#004E1B"
                : "rgba(0, 0, 0, 0.24)",
            }}
            value={values.preferredPosition}
            onChange={(event) =>
              handleFieldChange("preferredPosition", event.currentTarget.value)
            }
            required
          >
            <option value="" disabled style={{ color: "rgba(0, 0, 0, 0.24)" }}>
              მიუთითე სასურველი პოზიცია
            </option>
            {positionOptions.map((option) => (
              <option key={option} value={option} style={{ color: "#004E1B" }}>
                {option}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-lg text-[#5c5c5c]">
            v
          </span>
        </div>
      </label>

      <label
        htmlFor="application-schedule"
        className={`${fieldGroupStyles} text-sm`}
      >
        <span className={fieldTitleClasses} style={fieldTitleStyle}>გამოცდილება</span>
        <div className="relative">
          <select
            id="application-schedule"
            name="preferredSchedule"
            className={`${inputBaseStyles} appearance-none pr-12`}
            style={{
              color: values.preferredSchedule
                ? "#004E1B"
                : "rgba(0, 0, 0, 0.24)",
            }}
            value={values.preferredSchedule}
            onChange={(event) =>
              handleFieldChange("preferredSchedule", event.currentTarget.value)
            }
            required
          >
            <option value="" disabled style={{ color: "rgba(0, 0, 0, 0.24)" }}>
                მიუთითე შენი გამოცდილება
            </option>
            {scheduleOptions.map((option) => (
              <option key={option} value={option} style={{ color: "#004E1B" }}>
                {option}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-lg text-[#5c5c5c]">
            v
          </span>
        </div>
      </label>

      <label
        htmlFor="application-location"
        className={`${fieldGroupStyles} text-sm`}
      >
        <span className={fieldTitleClasses} style={fieldTitleStyle}>ლოკაცია</span>
        <div className="relative">
          <select
            id="application-location"
            name="preferredLocation"
            className={`${inputBaseStyles} appearance-none pr-12`}
            style={{
              color: values.preferredLocation
                ? "#004E1B"
                : "rgba(0, 0, 0, 0.24)",
            }}
            value={values.preferredLocation}
            onChange={(event) =>
              handleFieldChange("preferredLocation", event.currentTarget.value)
            }
            required
          >
            <option value="" disabled style={{ color: "rgba(0, 0, 0, 0.24)" }}>
              მიუთითე სასურველი ლოკაცია
            </option>
            {locationOptions.map((option) => (
              <option key={option} value={option} style={{ color: "#004E1B" }}>
                {option}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-lg text-[#5c5c5c]">
            v
          </span>
        </div>
      </label>

      <label className="flex items-center gap-3 text-xs">
        <input
          type="checkbox"
          className="h-5 w-5 shrink-0 rounded border border-[#9b9b9b] bg-white accent-[#1DA94A] focus-visible:outline-2 focus-visible:outline-[#1DA94A]"
          checked={values.privacyConsent}
          onChange={(event) =>
            handleFieldChange("privacyConsent", event.currentTarget.checked)
          }
          required
        />
        <span className="text-xs font-normal leading-snug text-black">
          თანხმობა პერსონალური მონაცემების გაზიარებაზე.
        </span>
      </label>

      {status === "error" && errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : null}

      {status === "success" ? (
        <p className="text-sm text-[#1DA94A]">
          თქვენი მონაცემები წარმატებით გადაიგზავნა
        </p>
      ) : null}

      <button
        type="submit"
        className="mt-4 self-center min-w-[220px] rounded-[9px] bg-[#1DA94A] px-16 py-3 text-lg font-bold text-white transition hover:bg-[#17853a] disabled:cursor-not-allowed disabled:bg-[#7bc891]"
        style={{ fontFamily: "DejaVu Sans", fontWeight: 700 }}
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "იგზავნება..." : "გაგზავნა"}
      </button>
    </form>
  );
}
