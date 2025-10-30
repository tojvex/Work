"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

import ApplicationForm from "@/components/ApplicationForm";
import HeroHeader from "@/components/HeroHeader";
import { getApplicationOptions } from "@/data/applicationOptions";

export default function ApplicationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#dedddd]" />}>
      <ApplicationPageContent />
    </Suspense>
  );
}

function ApplicationPageContent() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const isDarkTheme = theme === "dark";

  const searchParams = useSearchParams();
  const cardId = searchParams.get("card");
  const { positionOptions, scheduleOptions, locationOptions } =
    getApplicationOptions(cardId);

  const backgroundStyle = isDarkTheme
    ? { background: "linear-gradient(180deg, #363264 0%, #201C49 100%)" }
    : { background: "#dedddd" };

  return (
    <div className="flex min-h-screen flex-col" style={backgroundStyle}>
      <HeroHeader
        headline=""
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setTheme(isDarkTheme ? "light" : "dark")}
      />

      <main className="flex flex-1 justify-center px-4 py-12">
        <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-6">
          <ApplicationForm
            positionOptions={positionOptions}
            scheduleOptions={scheduleOptions}
            locationOptions={locationOptions}
          />
        </div>
      </main>
    </div>
  );
}
