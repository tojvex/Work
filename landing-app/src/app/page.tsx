"use client";

import { useState } from "react";

import CardModal from "@/components/CardModal";
import HeroHeader from "@/components/HeroHeader";
import HeroScene from "@/components/HeroScene";
import IntroDoor from "@/components/IntroDoor";
import {
  HEADLINE,
  heroItems,
  type HeroItem,
  type HeroItemWithCard,
} from "@/data/heroItems";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedCard, setSelectedCard] = useState<HeroItemWithCard | null>(null);

  const isDarkTheme = theme === "dark";

  const handleHeroSelection = (item: HeroItem) => {
    if (!item.card) {
      return;
    }

    setSelectedCard(item as HeroItemWithCard);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#E4E3E3]">
      <IntroDoor />
      <HeroHeader
        headline={HEADLINE}
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setTheme(isDarkTheme ? "light" : "dark")}
      />

      <main
        className="flex flex-1 items-start justify-center px-0 pb-6 pt-0 sm:px-4 sm:pt-4 lg:pb-8"
        style={
          isDarkTheme
            ? { background: "linear-gradient(180deg, #363264 0%, #201C49 100%)" }
            : { background: "#dedddd" }
        }
      >
        <HeroScene
          headline={HEADLINE}
          items={heroItems}
          isDarkTheme={isDarkTheme}
          activeCardId={selectedCard?.id ?? null}
          onSelectItem={handleHeroSelection}
        />
      </main>

      <CardModal card={selectedCard} onClose={handleCloseModal} />
    </div>
  );
}
