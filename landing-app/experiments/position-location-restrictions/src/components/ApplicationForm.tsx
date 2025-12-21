"use client";

import { FormHeader } from "./application-form/components/FormHeader";
import { FormStatus } from "./application-form/components/FormStatus";
import { PositionSelect } from "./application-form/components/PositionSelect";
import { PrivacyConsent } from "./application-form/components/PrivacyConsent";
import { SelectField } from "./application-form/components/SelectField";
import { StreetSelector } from "./application-form/components/StreetSelector";
import { TextField } from "./application-form/components/TextField";
import { applicationFormCopy } from "./application-form/copy";
import type { ApplicationFormProps } from "./application-form/types";
import { useApplicationForm } from "./application-form/useApplicationForm";

export default function ApplicationForm({
  positionOptions,
  scheduleOptions,
  locationOptions,
}: ApplicationFormProps) {
  const errorCopy = applicationFormCopy.errors as Record<string, string | undefined>;
  const requiredText = errorCopy["required"] ?? "Required";

  const {
    values,
    status,
    errorMessage,
    fieldErrors,
    availableLocationOptions,
    availableStreetOptions,
    hasAvailablePositions,
    positionSelectColor,
    handleFieldChange,
    handleSubmit,
    toggleStreetSelection,
  } = useApplicationForm({ positionOptions, scheduleOptions, locationOptions });

  return (
    <form
      className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-[26px] bg-white/70 px-10 py-6 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur"
      onSubmit={handleSubmit}
      noValidate
    >
      <FormHeader />

      <TextField
        id="application-first-name"
        name="firstName"
        label={applicationFormCopy.labels.firstName}
        placeholder={applicationFormCopy.placeholders.firstName}
        value={values.firstName}
        onChange={(value) => handleFieldChange("firstName", value)}
        error={fieldErrors.firstName}
        autoComplete="given-name"
        required
      />

      <TextField
        id="application-last-name"
        name="lastName"
        label={applicationFormCopy.labels.lastName}
        placeholder={applicationFormCopy.placeholders.lastName}
        value={values.lastName}
        onChange={(value) => handleFieldChange("lastName", value)}
        error={fieldErrors.lastName}
        autoComplete="family-name"
        required
      />

      <TextField
        id="application-phone"
        name="phone"
        type="tel"
        label={applicationFormCopy.labels.phone}
        placeholder={applicationFormCopy.placeholders.phone}
        value={values.phone}
        onChange={(value) => {
          const digitsOnly = value.replace(/\D/g, "").slice(0, 9);
          handleFieldChange("phone", digitsOnly);
        }}
        error={fieldErrors.phone}
        autoComplete="tel"
        inputMode="numeric"
        pattern="\\d{9}"
        maxLength={9}
        required
      />

      <PositionSelect
        id="application-position"
        value={values.preferredPosition}
        options={positionOptions}
        onChange={(value) => handleFieldChange("preferredPosition", value)}
        color={positionSelectColor}
        hasAvailablePositions={hasAvailablePositions}
        error={fieldErrors.preferredPosition}
      />

      <SelectField
        id="application-schedule"
        name="preferredSchedule"
        label={applicationFormCopy.labels.schedule}
        placeholder={applicationFormCopy.placeholders.schedule}
        value={values.preferredSchedule}
        options={scheduleOptions}
        onChange={(value) => handleFieldChange("preferredSchedule", value)}
        required
        error={
          fieldErrors.preferredSchedule ||
          (!values.preferredSchedule && status === "error" ? requiredText : null)
        }
      />

      <SelectField
        id="application-location"
        name="preferredLocation"
        label={applicationFormCopy.labels.location}
        placeholder={applicationFormCopy.placeholders.location}
        value={values.preferredLocation}
        options={availableLocationOptions}
        onChange={(value) => handleFieldChange("preferredLocation", value)}
        required
        error={
          fieldErrors.preferredLocation ||
          (!values.preferredLocation && status === "error" ? requiredText : null)
        }
      />

      {availableStreetOptions.length > 0 ? (
        <StreetSelector
          options={availableStreetOptions}
          selected={values.preferredStreets}
          onToggle={toggleStreetSelection}
          error={fieldErrors.preferredStreet}
        />
      ) : null}

      <PrivacyConsent
        checked={values.privacyConsent}
        onChange={(checked) => handleFieldChange("privacyConsent", checked)}
      />

      <FormStatus status={status} errorMessage={errorMessage} />

      <button
        type="submit"
        className="mt-4 min-w-[220px] self-center rounded-[9px] bg-[#1DA94A] px-16 py-3 text-lg font-bold text-white transition hover:bg-[#17853a] disabled:cursor-not-allowed disabled:bg-[#7bc891]"
        style={{ fontFamily: "DejaVu Sans", fontWeight: 700 }}
        disabled={status === "submitting"}
      >
        {status === "submitting"
          ? applicationFormCopy.submit.submitting
          : applicationFormCopy.submit.idle}
      </button>
    </form>
  );
}
