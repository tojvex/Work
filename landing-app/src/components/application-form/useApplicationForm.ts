import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";

import {
  getPositionTrackingSlug,
  streetOptionsByCity,
  type ResolvedPositionOption,
} from "@/data/applicationOptions";

import {
  createFieldErrorsState,
  initialValues,
} from "./constants";
import { applicationFormCopy } from "./copy";
import type {
  ApplicationFormProps,
  ApplicationFormStatus,
  ApplicationFormValues,
  ApplicationSubmissionPayload,
  FieldErrors,
} from "./types";

const hasErrors = (errors: FieldErrors) =>
  Boolean(
    errors.firstName ||
      errors.lastName ||
      errors.phone ||
      errors.preferredSchedule ||
      errors.preferredLocation ||
      errors.preferredStreet ||
      errors.preferredPosition,
  );

const validateFields = (
  values: ApplicationFormValues,
  streets: string[],
  positions: ResolvedPositionOption[],
): FieldErrors => {
  const errors = createFieldErrorsState();
  const lettersOnly = /^[\p{L}]+$/u;
  const errorCopy = applicationFormCopy.errors as Record<string, string | undefined>;
  const required = errorCopy["required"] ?? "გთხოვთ შეავსოთ ველი";
  const requiredFirstName = errorCopy["requiredFirstName"] ?? required;
  const requiredLastName = errorCopy["requiredLastName"] ?? required;
  const requiredPhone = errorCopy["requiredPhone"] ?? required;
  const requiredSchedule = errorCopy["requiredSchedule"] ?? required;
  const requiredLocation = errorCopy["requiredLocation"] ?? required;
  const requiredPosition = errorCopy["requiredPosition"] ?? required;
  const requiredStreet = errorCopy["requiredStreet"] ?? required;

  if (!values.firstName.trim()) {
    errors.firstName = requiredFirstName;
  } else if (!lettersOnly.test(values.firstName.trim())) {
    errors.firstName = applicationFormCopy.errors.firstNameInvalid;
  }

  if (!values.lastName.trim()) {
    errors.lastName = requiredLastName;
  } else if (!lettersOnly.test(values.lastName.trim())) {
    errors.lastName = applicationFormCopy.errors.lastNameInvalid;
  }

  const phoneDigits = /^5[0-9]{8}$/;
  if (!values.phone.trim()) {
    errors.phone = requiredPhone;
  } else if (!phoneDigits.test(values.phone.trim())) {
    errors.phone = applicationFormCopy.errors.phoneInvalid;
  }

  if (streets.length > 0 && values.preferredStreets.length === 0) {
    errors.preferredStreet = requiredStreet;
  }

  if (!values.preferredSchedule) {
    errors.preferredSchedule = requiredSchedule;
  }

  if (!values.preferredLocation) {
    errors.preferredLocation = requiredLocation;
  }

  if (!values.preferredPosition) {
    errors.preferredPosition = requiredPosition;
  } else {
    const match = positions.find((option) => option.label === values.preferredPosition);
    if (!match) {
      errors.preferredPosition = applicationFormCopy.errors.positionNotFound;
    } else if (!match.available) {
      errors.preferredPosition = applicationFormCopy.errors.positionUnavailable;
    }
  }

  return errors;
};

export const useApplicationForm = ({
  positionOptions,
  scheduleOptions,
  locationOptions,
}: ApplicationFormProps) => {
  const router = useRouter();
  const [values, setValues] = useState<ApplicationFormValues>(initialValues);
  const [status, setStatus] = useState<ApplicationFormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>(createFieldErrorsState());
  const submissionLockRef = useRef(false);

  useEffect(() => {
    setValues((prev) => {
      const next = { ...prev };
      const hasPreferredPosition =
        next.preferredPosition &&
        positionOptions.some(
          (option) => option.label === next.preferredPosition && option.available,
        );
      if (next.preferredPosition && !hasPreferredPosition) {
        next.preferredPosition = "";
      }
      if (next.preferredSchedule && !scheduleOptions.includes(next.preferredSchedule)) {
        next.preferredSchedule = "";
      }
      if (next.preferredLocation && !locationOptions.includes(next.preferredLocation)) {
        next.preferredLocation = "";
      }
      const streetsForCity = streetOptionsByCity[next.preferredLocation] ?? [];
      if (streetsForCity.length === 0) {
        next.preferredStreets = [];
      } else if (next.preferredStreets.length > 0) {
        next.preferredStreets = next.preferredStreets.filter((street) =>
          streetsForCity.includes(street),
        );
      }
      return next;
    });
  }, [positionOptions, scheduleOptions, locationOptions]);

  const availableStreetOptions = useMemo(
    () => streetOptionsByCity[values.preferredLocation] ?? [],
    [values.preferredLocation],
  );

  const hasAvailablePositions = useMemo(
    () => positionOptions.some((option) => option.available),
    [positionOptions],
  );

  const selectedPositionOption = useMemo(
    () => positionOptions.find((option) => option.label === values.preferredPosition),
    [positionOptions, values.preferredPosition],
  );

  const positionSelectColor = selectedPositionOption
    ? selectedPositionOption.available
      ? "#004E1B"
      : "#b3261e"
    : "rgba(0, 0, 0, 0.24)";

  const handleFieldChange = useCallback(
    (field: keyof ApplicationFormValues, value: string | boolean) => {
      setValues((prev) => {
        if (field === "preferredLocation") {
          return {
            ...prev,
            preferredLocation: value as string,
            preferredStreets: [],
          };
        }

        return {
          ...prev,
          [field]: value,
        };
      });

      if (
        field === "firstName" ||
        field === "lastName" ||
        field === "phone" ||
        field === "preferredPosition" ||
        field === "preferredSchedule" ||
        field === "preferredLocation"
      ) {
        setFieldErrors((prev) => ({ ...prev, [field]: null }));
      }

      if (field === "preferredLocation") {
        setFieldErrors((prev) => ({ ...prev, preferredStreet: null }));
      }
    },
    [],
  );

  const toggleStreetSelection = useCallback((street: string) => {
    setValues((prev) => {
      const alreadySelected = prev.preferredStreets.includes(street);
      const preferredStreets = alreadySelected
        ? prev.preferredStreets.filter((item) => item !== street)
        : [...prev.preferredStreets, street];

      return { ...prev, preferredStreets };
    });

    setFieldErrors((prev) => ({ ...prev, preferredStreet: null }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setFieldErrors(createFieldErrorsState());
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (submissionLockRef.current) {
        return;
      }
      submissionLockRef.current = true;

      try {
        if (!hasAvailablePositions) {
          setErrorMessage(applicationFormCopy.errors.noAvailablePositions);
          setStatus("error");
          return;
        }

        const nextErrors = validateFields(values, availableStreetOptions, positionOptions);
        setFieldErrors(nextErrors);

        if (hasErrors(nextErrors)) {
          setErrorMessage(applicationFormCopy.errors.validationFailed);
          setStatus("error");
          return;
        }

        if (!values.privacyConsent) {
          setErrorMessage(applicationFormCopy.errors.privacyConsent);
          setStatus("error");
          return;
        }

        setStatus("submitting");
        setErrorMessage(null);

        const submissionPayload: ApplicationSubmissionPayload = {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          phone: values.phone.trim(),
          preferredPosition: values.preferredPosition,
          preferredSchedule: values.preferredSchedule,
          preferredLocation: values.preferredLocation,
          preferredStreets: values.preferredStreets,
        };

        const response = await fetch("/api/application", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionPayload),
        });

        const payload = await response.json().catch(() => null);

        if (!response.ok) {
          if (payload?.duplicate) {
            const message =
              applicationFormCopy.errors.duplicate ??
              "You already submitted recently. Please wait a few minutes and try again.";
            setErrorMessage(message);
            setStatus("error");
            return;
          }

          const message =
            payload?.message ??
            payload?.error ??
            "Unable to submit the form right now.";
          throw new Error(message);
        }

        if (payload?.duplicate) {
          const message =
            applicationFormCopy.errors.duplicate ??
            "You already submitted recently. Please wait a few minutes and try again.";
          setErrorMessage(message);
          setStatus("error");
          return;
        }

        setStatus("success");
        const trackingSlug = getPositionTrackingSlug(values.preferredPosition);
        resetForm();
        router.push(`/thank-you/${trackingSlug}`);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unexpected error occurred.";
        setErrorMessage(message);
        setStatus("error");
      } finally {
        submissionLockRef.current = false;
      }
    },
    [
      availableStreetOptions,
      hasAvailablePositions,
      positionOptions,
      resetForm,
      router,
      values,
    ],
  );

  return {
    availableStreetOptions,
    errorMessage,
    fieldErrors,
    handleFieldChange,
    handleSubmit,
    hasAvailablePositions,
    positionSelectColor,
    resetForm,
    status,
    toggleStreetSelection,
    values,
  };
};


