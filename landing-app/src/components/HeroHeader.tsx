"use client";

import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

import Logo from "@/media/Logo.png";
import DayModeToggle from "@/media/WhiteModeLogo.png";
import NightModeToggle from "@/media/DarkModeLogo.png";

const dejaVuSans = localFont({
  src: "../../public/fonts/DejavuSans/dejavu-sans-extra-light.ttf",
  weight: "200",
  display: "swap",
});

type HeroHeaderProps = {
  headline: string;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
};

export default function HeroHeader({
  headline,
  isDarkTheme,
  onToggleTheme,
}: HeroHeaderProps) {
  return (
    <header className="bg-[#1DA94A] text-white shadow-[0_6px_18px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between px-4 py-4 lg:hidden">
        <Link href="/" className="flex items-center" aria-label="Go to homepage">
          <Image
            src={Logo}
            alt="Jobs supermarket logo"
            className="h-12 w-auto cursor-pointer"
            priority
          />
        </Link>
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
        <Link href="/" className="flex items-center justify-center" aria-label="Go to homepage">
          <Image
            src={Logo}
            alt="Jobs supermarket logo"
            className="h-12 w-auto cursor-pointer"
            priority
          />
        </Link>
        <h1
          className={`max-w-152 text-center text-3xl font-extralight uppercase tracking-wide text-white ${dejaVuSans.className}`}
        >
          {headline}
        </h1>
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
    </header>
  );
}
