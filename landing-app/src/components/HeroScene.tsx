"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { HeroItem } from "@/data/heroItems";

type HeroSceneProps = {
  headline: string;
  items: HeroItem[];
  isDarkTheme: boolean;
  activeCardId: string | null;
  onSelectItem: (item: HeroItem) => void;
};

const DARK_MODE_DISABLED_IDS = new Set(["kitchen", "baker", "butchery", "warehouse"]);

const shouldDisableInDarkMode = (item: HeroItem, isDarkTheme: boolean) =>
  isDarkTheme && DARK_MODE_DISABLED_IDS.has(item.id);

export default function HeroScene({
  headline,
  items,
  isDarkTheme,
  activeCardId,
  onSelectItem,
}: HeroSceneProps) {
  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const sources = new Set<string>();

    items.forEach((item) => {
      [
        item.darkSrc,
        item.hoverDarkSrc,
        item.mobileDarkSrc,
        item.mobileHoverDarkSrc,
        item.card?.image,
      ].forEach((asset) => {
        if (!asset) {
          return;
        }

        if (typeof asset === "string") {
          sources.add(asset);
          return;
        }

        if ("src" in asset) {
          sources.add(asset.src);
        }
      });
    });

    const images = Array.from(sources).map((src) => {
      const img = new window.Image();
      img.src = src;
      return img;
    });

    return () => {
      images.forEach((img) => {
        img.src = "";
      });
    };
  }, [items]);

  return (
    <div className="flex w-full max-w-7xl flex-col items-stretch lg:items-center">
      {/* Mobile headline */}
      <div className="px-4 pt-5 pb-3 lg:hidden">
        <h1
          className="mx-auto max-w-[18ch] text-center text-2xl font-normal leading-snug tracking-wide sm:max-w-[22ch] sm:text-3xl md:text-4xl"
          style={{
            fontFamily: "DejaVu Sans",
            color: isDarkTheme ? "#FFFFFF" : "#006D0D",
          }}
        >
          {headline}
        </h1>
      </div>

      {/* Desktop scene */}
      <div
        className="relative hidden w-full lg:block"
        style={
          isDarkTheme
            ? { background: "linear-gradient(180deg, #363264 0%, #201C49 100%)" }
            : { background: "#dedddd" }
        }
      >
        <div className="relative aspect-1365/640 w-full">
          {items.map((item) => {
            const baseImage = isDarkTheme && item.darkSrc ? item.darkSrc : item.lightSrc;
            const hoverImage =
              isDarkTheme && item.hoverDarkSrc ? item.hoverDarkSrc : item.hoverLightSrc;

            const disabledInDark = shouldDisableInDarkMode(item, isDarkTheme);
            const canActivate = Boolean(item.card) && !disabledInDark;
            const showHoverSwap = canActivate && Boolean(hoverImage);

            // Accessible label only if clickable; otherwise let img alt handle it.
            const ariaLabel = canActivate ? (item.card?.heading ?? item.alt) : undefined;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (canActivate) onSelectItem(item);
                }}
                className={`group absolute ${item.desktopClass} border-0 bg-transparent p-0 ${
                  canActivate ? "cursor-pointer" : "cursor-default"
                }`}
                aria-label={ariaLabel}
                disabled={!canActivate}
              >
                <Image
                  src={baseImage}
                  alt={item.alt}
                  className={`h-auto w-full ${
                    showHoverSwap ? "transition-opacity duration-200 group-hover:opacity-0" : ""
                  }`}
                  priority={item.id === "service"}
                />
                {showHoverSwap && (
                  <Image
                    src={hoverImage!}
                    alt=""
                    className="absolute left-0 top-0 h-auto w-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    aria-hidden={true}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile scene */}
      <div
        className="relative mt-0 w-full aspect-9/16 lg:hidden"
        style={
          isDarkTheme
            ? { background: "linear-gradient(180deg, #363264 0%, #201C49 100%)" }
            : { background: "#dedddd" }
        }
      >
        {items.map((item) => {
          const mobileBaseImage =
            isDarkTheme && item.mobileDarkSrc ? item.mobileDarkSrc : item.mobileLightSrc;

          const mobileHoverImage =
            isDarkTheme && item.mobileHoverDarkSrc
              ? item.mobileHoverDarkSrc
              : item.mobileHoverLightSrc ??
                (isDarkTheme && item.hoverDarkSrc ? item.hoverDarkSrc : item.hoverLightSrc);

          const disabledInDark = shouldDisableInDarkMode(item, isDarkTheme);
          const canActivate = Boolean(item.card) && !disabledInDark;
          const hasHoverImage = canActivate && Boolean(mobileHoverImage);
          const isActive = activeCardId === item.id;

          const ariaLabel = canActivate ? (item.card?.heading ?? item.alt) : undefined;

          return (
            <button
              key={`${item.id}-mobile`}
              type="button"
              onClick={() => {
                if (canActivate) onSelectItem(item);
              }}
              className={`group absolute ${item.mobileClass} border-0 bg-transparent p-0 ${
                canActivate ? "cursor-pointer" : "cursor-default"
              }`}
              aria-label={ariaLabel}
              disabled={!canActivate}
            >
              <Image
                src={mobileBaseImage}
                alt={item.alt}
                className={`h-auto w-full transition-opacity duration-200 ${
                  isActive ? "opacity-0" : "opacity-100"
                } ${hasHoverImage ? "group-hover:opacity-0" : ""}`}
              />
              {hasHoverImage && (
                <Image
                  src={mobileHoverImage!}
                  alt=""
                  className={`absolute left-0 top-0 h-auto w-full transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-0"
                  } group-hover:opacity-100`}
                  aria-hidden={true}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
