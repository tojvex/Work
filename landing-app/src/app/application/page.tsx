"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

import ApplicationForm from "@/components/ApplicationForm";
import HeroHeader from "@/components/HeroHeader";
import { getApplicationOptions } from "@/data/applicationOptions";
import { HEADLINE } from "@/data/heroItems";

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
        headline={HEADLINE}
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setTheme(isDarkTheme ? "light" : "dark")}
      />
      <div className="px-4 pt-5 pb-3 lg:hidden">
        <h1
          className="mx-auto max-w-[18ch] text-center text-2xl font-normal leading-snug tracking-wide sm:max-w-[22ch] sm:text-3xl md:text-4xl"
          style={{
            fontFamily: "DejaVu Sans",
            color: isDarkTheme ? "#FFFFFF" : "#006D0D",
          }}
        >
          {HEADLINE}
        </h1>
      </div>

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
