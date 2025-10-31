import { google } from "googleapis";

export type ApplicationSubmission = {
  firstName: string;
  lastName: string;
  phone: string;
  preferredPosition: string;
  preferredSchedule: string;
  preferredLocation: string;
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

const getWorksheetRange = () => {
  const worksheet = process.env.GOOGLE_SPREADSHEET_RANGE ?? "Sheet1!A:G";
  return worksheet;
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

export const appendApplicationRow = async (
  submission: ApplicationSubmission,
) => {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();
  const range = getWorksheetRange();
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
          submission.preferredLocation,
        ],
      ],
    },
  });
};
