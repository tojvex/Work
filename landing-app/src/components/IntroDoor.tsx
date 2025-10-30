"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const DOOR_ANIMATION_DURATION = 1500;

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
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black">
      <div className="relative aspect-video w-full max-w-screen-xl overflow-hidden">
        <div className="absolute inset-0 flex">
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
              src="/intro-door-right.png"
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

