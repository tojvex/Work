import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { streetOptionsByCity, type ResolvedPositionOption } from "@/data/applicationOptions";

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
  locationOptions: string[],
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
  const locationUnavailable =
    errorCopy["locationUnavailable"] ?? "Selected location is not available for this position.";
  const streetUnavailable =
    errorCopy["streetUnavailable"] ??
    "Selected street is not available for this position and location.";

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
  if (values.preferredStreets.length > 0) {
    const allowedStreets = new Set(streets);
    const invalidStreet = values.preferredStreets.find(
      (street) => !allowedStreets.has(street),
    );
    if (invalidStreet) {
      errors.preferredStreet = streetUnavailable;
    }
  }

  if (!values.preferredSchedule) {
    errors.preferredSchedule = requiredSchedule;
  }

  if (!values.preferredLocation) {
    errors.preferredLocation = requiredLocation;
  } else if (!locationOptions.includes(values.preferredLocation)) {
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
    } else if (
      values.preferredLocation &&
      (!locationOptions.includes(values.preferredLocation) ||
        !match.allowedLocations.includes(values.preferredLocation))
    ) {
      errors.preferredLocation = locationUnavailable;
    }
  }

  return errors;
};

export const useApplicationForm = ({
  positionOptions,
  scheduleOptions,
  locationOptions,
}: ApplicationFormProps) => {
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
      const selected = next.preferredPosition
        ? positionOptions.find((option) => option.label === next.preferredPosition)
        : undefined;
      const allowedLocations = selected?.allowedLocations ?? locationOptions;
      if (
        next.preferredLocation &&
        (!locationOptions.includes(next.preferredLocation) ||
          !allowedLocations.includes(next.preferredLocation))
      ) {
        next.preferredLocation = "";
      }
      const streetsForCity = streetOptionsByCity[next.preferredLocation] ?? [];
      const allowedStreetsForLocation =
        selected?.allowedStreetsByLocation?.[next.preferredLocation];
      if (streetsForCity.length === 0) {
        next.preferredStreets = [];
      } else if (next.preferredStreets.length > 0) {
        next.preferredStreets = next.preferredStreets.filter((street) => {
          if (!streetsForCity.includes(street)) {
            return false;
          }
          if (allowedStreetsForLocation && !allowedStreetsForLocation.includes(street)) {
            return false;
          }
          return true;
        });
      }
      return next;
    });
  }, [positionOptions, scheduleOptions, locationOptions]);

  const selectedPositionOption = useMemo(
    () => positionOptions.find((option) => option.label === values.preferredPosition),
    [positionOptions, values.preferredPosition],
  );

  const availableStreetOptions = useMemo(() => {
    const base = streetOptionsByCity[values.preferredLocation] ?? [];
    if (!selectedPositionOption) {
      return base;
    }

    const allowedForLocation =
      selectedPositionOption.allowedStreetsByLocation?.[values.preferredLocation];
    if (!allowedForLocation) {
      return base;
    }

    return base.filter((street) => allowedForLocation.includes(street));
  }, [selectedPositionOption, values.preferredLocation]);

  const availableLocationOptions = useMemo(() => {
    if (!selectedPositionOption) {
      return locationOptions;
    }

    return locationOptions.filter((location) =>
      selectedPositionOption.allowedLocations.includes(location),
    );
  }, [locationOptions, selectedPositionOption]);

  const hasAvailablePositions = useMemo(
    () => positionOptions.some((option) => option.available),
    [positionOptions],
  );

  const positionSelectColor = selectedPositionOption
    ? selectedPositionOption.available
      ? "#004E1B"
      : "#b3261e"
    : "rgba(0, 0, 0, 0.24)";

  const handleFieldChange = useCallback(
    (field: keyof ApplicationFormValues, value: string | boolean) => {
      setValues((prev) => {
        if (field === "preferredPosition") {
          const nextPosition = positionOptions.find((option) => option.label === value);
          const allowedLocations = nextPosition?.allowedLocations ?? locationOptions;
          const isCurrentLocationAllowed =
            prev.preferredLocation && allowedLocations.includes(prev.preferredLocation);
          let nextStreets = prev.preferredStreets;
          if (isCurrentLocationAllowed) {
            const allowedStreetsForLocation =
              nextPosition?.allowedStreetsByLocation?.[prev.preferredLocation];
            if (allowedStreetsForLocation) {
              nextStreets = nextStreets.filter((street) =>
                allowedStreetsForLocation.includes(street),
              );
            }
          } else {
            nextStreets = [];
          }

          return {
            ...prev,
            preferredPosition: value as string,
            preferredLocation: isCurrentLocationAllowed ? prev.preferredLocation : "",
            preferredStreets: nextStreets,
          };
        }

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
    [locationOptions, positionOptions],
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

        const nextErrors = validateFields(
          values,
          availableStreetOptions,
          positionOptions,
          availableLocationOptions,
        );
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
        resetForm();
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
      availableLocationOptions,
      availableStreetOptions,
      hasAvailablePositions,
      positionOptions,
      resetForm,
      values,
    ],
  );

  return {
    availableLocationOptions,
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


