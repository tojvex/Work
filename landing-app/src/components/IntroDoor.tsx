"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const DOOR_ANIMATION_DURATION = 1500;
const INTRO_STORAGE_KEY = "introDoorSeen";

export default function IntroDoor() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show on first visit of each browser session (sessionStorage resets per tab/window).
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storage = window.sessionStorage;
    const hasSeenIntro = storage.getItem(INTRO_STORAGE_KEY) === "1";

    if (hasSeenIntro) {
      return;
    }

    storage.setItem(INTRO_STORAGE_KEY, "1");
    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }

    document.body.style.overflow = "";

    return undefined;
  }, [isVisible]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setIsVisible(false);
    }, DOOR_ANIMATION_DURATION);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isOpen]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black">
      <div className="relative aspect-video w-screen max-w-none overflow-hidden">
        <div className="absolute inset-0 flex">
          <button
            type="button"
            className="relative h-full w-1/2 cursor-pointer border-none bg-transparent p-0"
            onClick={() => setIsOpen(true)}
            aria-label="Open the door"
          >
            <Image
              src="/intro-door-left-v2.png"
              alt="Left door"
              fill
              priority
              sizes="50vw"
              className={`object-cover object-left transition-transform ease-in-out ${
                isOpen ? "-translate-x-full" : "translate-x-0"
              }`}
              style={{ transitionDuration: `${DOOR_ANIMATION_DURATION}ms` }}
            />
          </button>
          <button
            type="button"
            className="relative h-full w-1/2 cursor-pointer border-none bg-transparent p-0"
            onClick={() => setIsOpen(true)}
            aria-label="Open the door"
          >
            <Image
              src="/intro-door-right-v2.png"
              alt="Right door"
              fill
              priority
              sizes="50vw"
              className={`object-cover object-right transition-transform ease-in-out ${
                isOpen ? "translate-x-full" : "translate-x-0"
              }`}
              style={{ transitionDuration: `${DOOR_ANIMATION_DURATION}ms` }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
