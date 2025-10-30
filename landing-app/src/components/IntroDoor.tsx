"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const DOOR_ANIMATION_DURATION = 700;

export default function IntroDoor() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

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
    <div className="fixed inset-0 z-999 flex items-stretch justify-center bg-black">
      <div className="relative flex h-full w-full max-w-screen-2xl overflow-hidden">
        <button
          type="button"
          className="relative h-full w-1/2 cursor-pointer border-none bg-transparent p-0"
          onClick={() => setIsOpen(true)}
          aria-label="Open the door"
        >
          <Image
            src="/intro-door-left.png"
            alt="Left door"
            fill
            priority
            sizes="50vw"
            className={`object-cover object-left transition-transform duration-[${DOOR_ANIMATION_DURATION}ms] ease-in ${
              isOpen ? "-translate-x-full" : "translate-x-0"
            }`}
          />
        </button>
        <button
          type="button"
          className="relative h-full w-1/2 cursor-pointer border-none bg-transparent p-0"
          onClick={() => setIsOpen(true)}
          aria-label="Open the door"
        >
          <Image
            src="/intro-door-right.png"
            alt="Right door"
            fill
            priority
            sizes="50vw"
            className={`object-cover object-right transition-transform duration-[${DOOR_ANIMATION_DURATION}ms] ease-in ${
              isOpen ? "translate-x-full" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
