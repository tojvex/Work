"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import type { HeroItemWithCard } from "@/data/heroItems";

type CardModalProps = {
  card: HeroItemWithCard | null;
  isDarkTheme: boolean;
  onClose: () => void;
};

export default function CardModal({ card, isDarkTheme, onClose }: CardModalProps) {
  const [renderedCard, setRenderedCard] = useState<HeroItemWithCard | null>(null);
  const pendingCardRef = useRef<HeroItemWithCard | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    if (!card) {
      pendingCardRef.current = null;

      Promise.resolve().then(() => {
        if (!cancelled) {
          setRenderedCard(null);
        }
      });

      return () => {
        cancelled = true;
      };
    }

    pendingCardRef.current = card;
    const targetImage =
      isDarkTheme && card.card.darkImage ? card.card.darkImage : card.card.image;
    const image = new window.Image();
    image.src = targetImage.src;

    const resolve = () => {
      if (!cancelled && pendingCardRef.current?.id === card.id) {
        setRenderedCard(card);
        pendingCardRef.current = null;
      }
    };

    if (image.complete) {
      resolve();
    } else {
      image.addEventListener("load", resolve);
      image.addEventListener("error", resolve);
    }

    return () => {
      cancelled = true;
      image.removeEventListener("load", resolve);
      image.removeEventListener("error", resolve);
    };
  }, [card, isDarkTheme]);

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

  const handleApplyClick = () => {
    onClose();
    const target = renderedCard.id
      ? `/application?card=${encodeURIComponent(renderedCard.id)}`
      : "/application";
    router.push(target);
  };

  const cardImage =
    isDarkTheme && renderedCard.card.darkImage
      ? renderedCard.card.darkImage
      : renderedCard.card.image;

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
        <Image src={cardImage} alt={renderedCard.card.heading} className="h-auto w-full" priority />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 h-8 w-8 cursor-pointer border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="Close modal"
        />
        <button
          type="button"
          className="absolute bottom-2.5 left-1/2 w-[60%] -translate-x-1/2 cursor-pointer rounded-2xl bg-[#1DA94A] py-4 text-base font-semibold text-white shadow transition hover:bg-[#17853a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={handleApplyClick}
        >
          არჩევა
        </button>
      </div>
    </div>
  );
}
