import { NextResponse } from "next/server";

import {
  appendApplicationRow,
  type ApplicationSubmission,
} from "@/lib/googleSheets";
import {
  applicationOptionsByCard,
  type PositionOptionConfig,
} from "@/data/applicationOptions";

const normalizePositionLabel = (value: PositionOptionConfig | string) =>
  (typeof value === "string" ? value : value.label).trim();

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

  const worksheet = resolveWorksheetForSubmission(payload);

  const result = await appendApplicationRow({ ...payload, phone }, worksheet);

    return NextResponse.json({ success: true, duplicate: result.duplicate });
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
