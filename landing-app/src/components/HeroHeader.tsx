"use client";

import Image from "next/image";

import Logo from "@/media/Logo.png";
import DayModeToggle from "@/media/WhiteModeLogo.png";
import NightModeToggle from "@/media/DarkModeLogo.png";

type HeroHeaderProps = {
  headline: string;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  onSelectTheme: (theme: "light" | "dark") => void;
};

export default function HeroHeader({
  headline,
  isDarkTheme,
  onToggleTheme,
  onSelectTheme,
}: HeroHeaderProps) {
  const logoElement = (
    <Image src={Logo} alt="Jobs supermarket logo" className="h-12 w-auto" priority />
  );

  return (
    <header className="bg-[#1DA94A] text-white shadow-[0_6px_18px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between px-4 py-4 lg:hidden">
        <div className="flex items-center">{logoElement}</div>
        <button
          type="button"
          onClick={onToggleTheme}
          className="cursor-pointer rounded-full border-0 bg-transparent p-0 transition focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
          aria-pressed={isDarkTheme}
        >
          <Image
            src={isDarkTheme ? NightModeToggle : DayModeToggle}
            alt=""
            className="h-10 w-auto"
            priority
          />
        </button>
      </div>
      <div className="hidden items-center justify-evenly gap-4 px-8 py-5 lg:flex">
        <div className="flex items-center justify-center">{logoElement}</div>
        <h1 className="max-w-152 text-center text-3xl font-semibold tracking-wide">{headline}</h1>
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => onSelectTheme("light")}
            className={`cursor-pointer rounded-full border-0 bg-transparent p-0 transition  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              isDarkTheme ? "opacity-60" : "opacity-100"
            }`}
            aria-label="Switch to light mode"
            aria-pressed={!isDarkTheme}
          >
            <Image src={DayModeToggle} alt="" className="h-10 w-auto" priority />
          </button>
          <button
            type="button"
            onClick={() => onSelectTheme("dark")}
            className={`cursor-pointer rounded-full border-0 bg-transparent p-0 transition  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              isDarkTheme ? "opacity-100" : "opacity-60"
            }`}
            aria-label="Switch to dark mode"
            aria-pressed={isDarkTheme}
          >
            <Image src={NightModeToggle} alt="" className="h-10 w-auto" priority />
          </button>
        </div>
      </div>
    </header>
  );
}
