import { google } from "googleapis";

export type ApplicationSubmission = {
  firstName: string;
  lastName: string;
  phone: string;
  preferredPosition: string;
  preferredSchedule: string;
  preferredLocation: string;
  preferredStreet?: string;
  preferredStreets?: string[];
};

export type AppendResult = {
  appended: boolean;
  duplicate: boolean;
  timestamp: string;
};

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

let sheetsClient: ReturnType<typeof google.sheets> | null = null;

const getSpreadsheetId = () => {
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Missing GOOGLE_SPREADSHEET_ID environment variable.");
  }
  return spreadsheetId;
};

const getWorksheetRange = (worksheet?: string) => {
  const defaultRange = process.env.GOOGLE_SPREADSHEET_RANGE ?? "Sheet1!A:G";

  if (!worksheet) {
    return defaultRange;
  }

  const [, columnRange = "A:G"] = defaultRange.split("!");
  return `${worksheet}!${columnRange}`;
};

const getSheetsClient = async () => {
  if (sheetsClient) {
    return sheetsClient;
  }

  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n",
  );

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Missing Google service account credentials. Ensure GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY are set.",
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });

  await auth.authorize();

  sheetsClient = google.sheets({ version: "v4", auth });

  return sheetsClient;
};

const normalize = (value: string) => value.trim().toLowerCase();

const buildLocationValue = (submission: ApplicationSubmission) => {
  const location = submission.preferredLocation.trim();

  const preferredStreets = Array.isArray(submission.preferredStreets)
    ? submission.preferredStreets.map((street) => street.trim()).filter(Boolean)
    : submission.preferredStreet
      ? [submission.preferredStreet.trim()]
      : [];

  const uniqueStreets = [...new Set(preferredStreets)];

  return uniqueStreets.length > 0
    ? uniqueStreets.map((street) => `${location}- ${street}`).join(", ")
    : location;
};

const createSubmissionSignature = (
  submission: ApplicationSubmission,
  locationValue: string,
) =>
  [
    normalize(submission.firstName),
    normalize(submission.lastName),
    submission.phone.trim(),
    normalize(submission.preferredPosition),
    normalize(submission.preferredSchedule),
    normalize(locationValue),
  ].join("|");

const isDuplicateSubmission = async (
  submission: ApplicationSubmission,
  locationValue: string,
  worksheet?: string,
): Promise<boolean> => {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();
  const range = getWorksheetRange(worksheet);
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
    majorDimension: "ROWS",
  });

  const rows = response.data.values ?? [];
  if (rows.length === 0) {
    return false;
  }

  // Prevent accidental rapid duplicates (e.g., double clicks) by checking
  // recent rows for an identical signature within the dedup window.
  // Only look at the most recent rows to keep the request light.
  const recentRows = rows.slice(-40);
  const targetSignature = createSubmissionSignature(submission, locationValue);
  const dedupWindowMs = 10 * 60 * 1000; // 10 minutes
  const now = Date.now();

  return recentRows.some((row) => {
    const [timestamp, firstName, lastName, phone, position, schedule, location] = row;
    if (!phone || !position || !schedule || !location) {
      return false;
    }

    const rowSignature = [
      normalize(String(firstName ?? "")),
      normalize(String(lastName ?? "")),
      String(phone ?? "").trim(),
      normalize(String(position ?? "")),
      normalize(String(schedule ?? "")),
      normalize(String(location ?? "")),
    ].join("|");

    if (rowSignature !== targetSignature) {
      return false;
    }

    if (!timestamp) {
      return true;
    }

    const parsedTimestamp = Date.parse(String(timestamp));
    if (Number.isNaN(parsedTimestamp)) {
      return true;
    }

    return now - parsedTimestamp <= dedupWindowMs;
  });
};

export const appendApplicationRow = async (
  submission: ApplicationSubmission,
  worksheet?: string,
): Promise<AppendResult> => {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();
  const range = getWorksheetRange(worksheet);
  const timeZone = process.env.APPLICATION_TIME_ZONE ?? "Asia/Tbilisi";
  const timestamp = new Date().toLocaleString("sv-SE", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const locationValue = buildLocationValue(submission);

  const duplicate = await isDuplicateSubmission(submission, locationValue, worksheet);
  if (duplicate) {
    return { appended: false, duplicate: true, timestamp };
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          timestamp,
          submission.firstName,
          submission.lastName,
          submission.phone,
          submission.preferredPosition,
          submission.preferredSchedule,
          locationValue,
        ],
      ],
    },
  });

  return { appended: true, duplicate: false, timestamp };
};
