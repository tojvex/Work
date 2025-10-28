"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import type { HeroItemWithCard } from "@/data/heroItems";

type CardModalProps = {
  card: HeroItemWithCard | null;
  onClose: () => void;
};

export default function CardModal({ card, onClose }: CardModalProps) {
  const [renderedCard, setRenderedCard] = useState<HeroItemWithCard | null>(null);
  const pendingCardRef = useRef<HeroItemWithCard | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!card) {
      pendingCardRef.current = null;
      setRenderedCard(null);
      return;
    }

    pendingCardRef.current = card;
    const image = new window.Image();
    image.src = card.card.image.src;

    const resolve = () => {
      if (pendingCardRef.current?.id === card.id) {
        setRenderedCard(card);
        pendingCardRef.current = null;
      }
    };

    if (image.complete) {
      resolve();
      return;
    }

    image.addEventListener("load", resolve);
    image.addEventListener("error", resolve);

    return () => {
      image.removeEventListener("load", resolve);
      image.removeEventListener("error", resolve);
    };
  }, [card]);

  useEffect(() => {
    if (!renderedCard) {
      return undefined;
    }

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus?.();
      previouslyFocusedRef.current = null;
    };
  }, [renderedCard]);

  if (!renderedCard) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={renderedCard.card.heading}
        className="relative w-[min(338px,90vw)] outline-none"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={renderedCard.card.image}
          alt={`${renderedCard.card.heading} ვაკანსიის ბარათი`}
          className="h-auto w-full"
          priority
        />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 h-8 w-8 cursor-pointer border-0 bg-transparent p-0 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="დახურვა"
        />
        <button
          type="button"
          className="absolute bottom-4 left-1/2 w-[50%] -translate-x-1/2 rounded-full bg-[#1DA94A] py-3 text-base font-semibold text-white shadow transition hover:bg-[#17853a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={() => {}}
        >
          გაგზავნა
        </button>
      </div>
    </div>
  );
}
