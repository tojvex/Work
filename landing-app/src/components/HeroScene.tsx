"use client";

import Image from "next/image";

import type { HeroItem } from "@/data/heroItems";

type HeroSceneProps = {
  headline: string;
  items: HeroItem[];
  isDarkTheme: boolean;
  activeCardId: string | null;
  onSelectItem: (item: HeroItem) => void;
};

export default function HeroScene({
  headline,
  items,
  isDarkTheme,
  activeCardId,
  onSelectItem,
}: HeroSceneProps) {
  return (
    <div className="flex w-full max-w-7xl flex-col items-stretch lg:items-center">
      <div className="px-4 pt-5 pb-3 lg:hidden">
        <h1
          className={`text-center text-2xl font-bold tracking-wide leading-tight sm:text-3xl md:text-4xl ${
            isDarkTheme ? "text-white" : "text-[#1DA94A]"
          }`}
        >
          {headline}
        </h1>
      </div>
      <div
        className="relative hidden w-full lg:block"
        style={
          isDarkTheme
            ? { background: "linear-gradient(180deg, #363264 0%, #201C49 100%)" }
            : { background: "#dedddd" }
        }
      >
        <div className="relative aspect-[1365/640] w-full">
          {items.map((item) => {
            const baseImage = isDarkTheme && item.darkSrc ? item.darkSrc : item.lightSrc;
            const hoverImage =
              isDarkTheme && item.hoverDarkSrc ? item.hoverDarkSrc : item.hoverLightSrc;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectItem(item)}
                className={`group absolute ${item.desktopClass} border-0 bg-transparent p-0 ${
                  item.card ? "cursor-pointer" : "cursor-default"
                }`}
                aria-label={item.card ? `${item.card.heading} ვაკანსიის ბარათი` : undefined}
                disabled={!item.card}
              >
                <Image
                  src={baseImage}
                  alt={item.alt}
                  className="h-auto w-full transition-opacity duration-200 group-hover:opacity-0"
                  priority={item.id === "service"}
                />
                <Image
                  src={hoverImage}
                  alt=""
                  className="absolute left-0 top-0 h-auto w-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  aria-hidden
                />
              </button>
            );
          })}
        </div>
      </div>

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
          const hasHoverImage = Boolean(mobileHoverImage);
          const isActive = activeCardId === item.id;

          return (
            <button
              key={`${item.id}-mobile`}
              type="button"
              onClick={() => onSelectItem(item)}
              className={`group absolute ${item.mobileClass} border-0 bg-transparent p-0 ${
                item.card ? "cursor-pointer" : "cursor-default"
              }`}
              aria-label={item.card ? `${item.card.heading} ვაკანსიის ბარათი` : undefined}
              disabled={!item.card}
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
                  src={mobileHoverImage}
                  alt=""
                  className={`absolute left-0 top-0 h-auto w-full transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-0"
                  } group-hover:opacity-100`}
                  aria-hidden
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
