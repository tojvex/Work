import { NextResponse } from "next/server";

import {
  appendApplicationRow,
  type ApplicationSubmission,
} from "@/lib/googleSheets";
import { applicationOptionsByCard } from "@/data/applicationOptions";

const CARD_KEY_TO_WORKSHEET: Record<string, string> = {
  security: "Security",
  service: "Service",
  kitchen: "Kitchen",
  delivery: "Delivery",
  warehouse: "Warehouse",
  cashier: "Cashier",
  butchery: "Butchery",
  baker: "Bakery",
};

const POSITION_TO_WORKSHEET = new Map<string, string>(
  Object.entries(applicationOptionsByCard)
    .filter(([key]) => key in CARD_KEY_TO_WORKSHEET)
    .flatMap(([key, optionSet]) => {
      const worksheet = CARD_KEY_TO_WORKSHEET[key];
      return optionSet.positionOptions.map((position) => [position, worksheet] as const);
    }),
);

const resolveWorksheetForSubmission = (
  submission: ApplicationSubmission,
): string | undefined => {
  if (submission.preferredPosition) {
    const worksheet = POSITION_TO_WORKSHEET.get(submission.preferredPosition);
    if (worksheet) {
      return worksheet;
    }
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
