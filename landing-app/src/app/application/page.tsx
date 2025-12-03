"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ApplicationForm from "@/components/ApplicationForm";
import HeroHeader from "@/components/HeroHeader";
import { useTheme } from "@/components/ThemeProvider";
import {
  getApplicationOptions,
  resolveCardShift,
  type ResolvedCardShift,
  type Shift,
} from "@/data/applicationOptions";
import { HEADLINE, heroItems } from "@/data/heroItems";
import { toMtavruli } from "@/utils/georgian";

export default function ApplicationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#dedddd]" />}>
      <ApplicationPageContent />
    </Suspense>
  );
}

function ApplicationPageContent() {
  const { isDarkTheme, toggleTheme } = useTheme();
  const router = useRouter();

  const searchParams = useSearchParams();
  const rawCardId = searchParams.get("card");
  const themeShift: Shift = isDarkTheme ? "night" : "day";
  const resolved: ResolvedCardShift = resolveCardShift(rawCardId, themeShift);
  const { positionOptions, scheduleOptions, locationOptions } = getApplicationOptions(
    resolved.cardKey,
    resolved.shift,
  );

  const heroItem = resolved.heroId ? heroItems.find((item) => item.id === resolved.heroId) : null;
  const isRoleAvailable =
    !resolved.cardKey ||
    (heroItem
      ? resolved.shift === "night"
        ? heroItem.availableNight
        : heroItem.availableDay
      : false);

  const SHIFT_LOCKED_IDS = new Set(["cashier", "service", "delivery"]);
  useEffect(() => {
    if (!resolved.heroId || !SHIFT_LOCKED_IDS.has(resolved.heroId)) {
      return;
    }

    const targetCard = isDarkTheme ? `${resolved.heroId}night` : `${resolved.heroId}day`;
    if (resolved.cardKey !== targetCard) {
      router.replace(`/application?card=${encodeURIComponent(targetCard)}`);
    }
  }, [isDarkTheme, resolved.cardKey, resolved.heroId, router]);

  const mtavruliHeadline = toMtavruli(HEADLINE);

  const backgroundStyle = isDarkTheme
    ? { background: "linear-gradient(180deg, #363264 0%, #201C49 100%)" }
    : { background: "#dedddd" };

  return (
    <div className="flex min-h-screen flex-col" style={backgroundStyle}>
      <HeroHeader
        headline={HEADLINE}
        isDarkTheme={isDarkTheme}
        onToggleTheme={toggleTheme}
      />
      <div className="px-4 pt-5 pb-3 lg:hidden">
        <h1
          className="mx-auto max-w-[18ch] text-center text-2xl font-normal leading-snug tracking-wide sm:max-w-[22ch] sm:text-3xl md:text-4xl"
          style={{
            fontFamily: "var(--font-noto-sans-georgian)",
            color: isDarkTheme ? "#FFFFFF" : "#006D0D",
          }}
          data-original-headline={HEADLINE}
          data-mtavruli-headline={mtavruliHeadline}
        >
          {mtavruliHeadline}
        </h1>
      </div>

      <main className="flex flex-1 justify-center px-4 py-12">
        <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-6">
          {isRoleAvailable ? (
            <ApplicationForm
              positionOptions={positionOptions}
              scheduleOptions={scheduleOptions}
              locationOptions={locationOptions}
            />
          ) : (
            <p className="rounded-2xl bg-white/80 px-6 py-4 text-center text-base text-[#222] shadow">
              ამ პოზიციაზე ამ ცვლაში ვაკანსია დროებით არ არის ხელმისაწვდომი.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
