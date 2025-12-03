import { NextResponse } from "next/server";

import {
  appendApplicationRow,
  type ApplicationSubmission,
} from "@/lib/googleSheets";
import { applicationOptionsByCard } from "@/data/applicationOptions";

const normalizePosition = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const POSITION_TO_WORKSHEET = new Map<string, string>(
  Object.entries(applicationOptionsByCard)
    .filter(([key]) => key !== "default")
    .flatMap(([, optionSet]) =>
      optionSet.positionOptions.map((position) => {
        const label = typeof position === "string" ? position : position.label;
        const normalized = normalizePosition(label);
        return [normalized, normalized] as const;
      }),
    ),
);

const resolveWorksheetForSubmission = (
  submission: ApplicationSubmission,
): string | undefined => {
  if (submission.preferredPosition) {
    const normalizedPosition = normalizePosition(submission.preferredPosition);

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

    const worksheet = resolveWorksheetForSubmission(payload);

    await appendApplicationRow(payload, worksheet);

    return NextResponse.json({ success: true });
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
