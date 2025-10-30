import { NextResponse } from "next/server";

import {
  appendApplicationRow,
  type ApplicationSubmission,
} from "@/lib/googleSheets";

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

    await appendApplicationRow(payload);

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
