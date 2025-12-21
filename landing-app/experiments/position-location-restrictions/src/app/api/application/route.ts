import { NextResponse } from "next/server";

import {
  appendApplicationRow,
  type ApplicationSubmission,
} from "@/lib/googleSheets";
import {
  applicationOptionsByCard,
  streetOptionsByCity,
  type PositionOptionConfig,
} from "@/data/applicationOptions";

const normalizePositionLabel = (value: PositionOptionConfig | string) =>
  (typeof value === "string" ? value : value.label).trim();

const normalizeLocationLabel = (value: string) => value.trim();
const normalizeStreetLabel = (value: string) => value.trim();

const POSITION_TO_WORKSHEET = new Map<string, string>(
  Object.entries(applicationOptionsByCard)
    .filter(([key]) => key !== "default")
    .flatMap(([, optionSet]) =>
      optionSet.positionOptions.map((position) => {
        const normalized = normalizePositionLabel(position);
        return [normalized, normalized] as const;
      }),
    ),
);

const POSITION_TO_ALLOWED_LOCATIONS = Object.values(applicationOptionsByCard).reduce(
  (map, optionSet) => {
    const fallbackLocations = optionSet.allowedLocations ?? optionSet.locationOptions ?? [];

    optionSet.positionOptions.forEach((position) => {
      const normalizedPosition = normalizePositionLabel(position);
      const allowedLocations = position.allowedLocations ?? fallbackLocations;

      if (!map.has(normalizedPosition)) {
        map.set(normalizedPosition, new Set<string>());
      }

      const locationSet = map.get(normalizedPosition)!;
      allowedLocations.forEach((location) =>
        locationSet.add(normalizeLocationLabel(location)),
      );
      Object.keys(position.allowedStreetsByLocation ?? {}).forEach((location) => {
        locationSet.add(normalizeLocationLabel(location));
      });
    });

    return map;
  },
  new Map<string, Set<string>>(),
);

const POSITION_TO_ALLOWED_STREETS = Object.values(applicationOptionsByCard).reduce(
  (map, optionSet) => {
    const fallbackLocations = optionSet.allowedLocations ?? optionSet.locationOptions ?? [];

    optionSet.positionOptions.forEach((position) => {
      const normalizedPosition = normalizePositionLabel(position);
      const allowedLocations = position.allowedLocations ?? fallbackLocations;
      const locationKeys = new Set([
        ...allowedLocations.map(normalizeLocationLabel),
        ...Object.keys(position.allowedStreetsByLocation ?? {}).map(normalizeLocationLabel),
      ]);

      if (!map.has(normalizedPosition)) {
        map.set(normalizedPosition, new Map<string, Set<string> | null>());
      }

      const locationMap = map.get(normalizedPosition)!;
      locationKeys.forEach((locationKey) => {
        const streetsForLocation =
          position.allowedStreetsByLocation?.[locationKey] ??
          position.allowedStreetsByLocation?.[locationKey.trim()];
        if (streetsForLocation) {
          locationMap.set(
            locationKey,
            new Set(streetsForLocation.map((street) => normalizeStreetLabel(street))),
          );
        } else {
          // null means no street restriction beyond the city's available streets
          if (!locationMap.has(locationKey)) {
            locationMap.set(locationKey, null);
          }
        }
      });
    });

    return map;
  },
  new Map<string, Map<string, Set<string> | null>>(),
);

const isLocationAllowedForPosition = (position: string, location: string): boolean => {
  const normalizedPosition = normalizePositionLabel(position);
  const allowed = POSITION_TO_ALLOWED_LOCATIONS.get(normalizedPosition);
  if (!allowed || allowed.size === 0) {
    return true;
  }

  return allowed.has(normalizeLocationLabel(location));
};

const getAllowedStreetsForPositionLocation = (
  position: string,
  location: string,
): Set<string> | null | undefined => {
  const normalizedPosition = normalizePositionLabel(position);
  const normalizedLocation = normalizeLocationLabel(location);
  return POSITION_TO_ALLOWED_STREETS.get(normalizedPosition)?.get(normalizedLocation);
};

const areStreetsAllowedForSubmission = (submission: ApplicationSubmission): boolean => {
  const location = submission.preferredLocation;
  const position = submission.preferredPosition;
  const streets = Array.isArray(submission.preferredStreets)
    ? submission.preferredStreets
    : [];

  if (!location || !position || streets.length === 0) {
    return true;
  }

  const cityStreets = streetOptionsByCity[location] ?? [];
  const citySet = new Set(cityStreets.map((street) => normalizeStreetLabel(street)));
  const allowedStreets = getAllowedStreetsForPositionLocation(position, location);

  return streets.every((street) => {
    const normalizedStreet = normalizeStreetLabel(street);
    if (!citySet.has(normalizedStreet)) {
      return false;
    }
    if (allowedStreets && !allowedStreets.has(normalizedStreet)) {
      return false;
    }
    return true;
  });
};

const resolveWorksheetForSubmission = (
  submission: ApplicationSubmission,
): string | undefined => {
  if (submission.preferredPosition) {
    const normalizedPosition = normalizePositionLabel(submission.preferredPosition);

    if (!normalizedPosition) {
      return undefined;
    }

    const worksheet = POSITION_TO_WORKSHEET.get(normalizedPosition);
    return worksheet ?? normalizedPosition;
  }

  return undefined;
};

const REQUIRED_FIELDS: Array<keyof ApplicationSubmission> = [
  "firstName",
  "lastName",
  "phone",
  "preferredPosition",
  "preferredSchedule",
  "preferredLocation",
];

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ApplicationSubmission | null;

  if (!payload || typeof payload !== "object") {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 },
    );
    }

  for (const field of REQUIRED_FIELDS) {
    if (!payload[field]) {
      return NextResponse.json(
        { message: `Missing required field: ${field}.` },
        { status: 400 },
      );
    }
  }

  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const phonePattern = /^5\d{8}$/;
  if (!phonePattern.test(phone)) {
    return NextResponse.json(
      { message: "Phone number should start with 5 for example 5XXXXXXXX" },
      { status: 400 },
    );
  }

  if (
    payload.preferredPosition &&
    payload.preferredLocation &&
    !isLocationAllowedForPosition(payload.preferredPosition, payload.preferredLocation)
  ) {
    return NextResponse.json(
      { message: "Selected location is not available for this position." },
      { status: 400 },
    );
  }

  if (!areStreetsAllowedForSubmission(payload)) {
    return NextResponse.json(
      { message: "Selected street is not available for this position and location." },
      { status: 400 },
    );
  }

  const worksheet = resolveWorksheetForSubmission(payload);

  const result = await appendApplicationRow({ ...payload, phone }, worksheet);

  if (result.duplicate) {
    return NextResponse.json(
      {
        success: false,
        duplicate: true,
        message: "Duplicate submission detected. Please wait a few minutes and try again.",
      },
      { status: 409 },
    );
  }

    return NextResponse.json({ success: true, duplicate: false });
  } catch (error) {
    console.error("Form submission failed", error);

    const message =
      error instanceof Error ? error.message : "Unknown server error.";

    return NextResponse.json(
      { message: "Failed to submit the form.", details: message },
      { status: 500 },
    );
  }
}
