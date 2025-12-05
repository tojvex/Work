export type Shift = "day" | "night";

export type PositionOptionConfig = {
  label: string;
  availableDay: boolean;
  availableNight: boolean;
};

export type ResolvedPositionOption = {
  label: string;
  available: boolean;
};

export type ApplicationOptionSet = {
  positionOptions: PositionOptionConfig[];
  scheduleOptions: string[];
  locationOptions: string[];
};

export type ResolvedApplicationOptionSet = {
  positionOptions: ResolvedPositionOption[];
  scheduleOptions: string[];
  locationOptions: string[];
};

export const streetOptionsByCity: Record<string, string[]> = {
  "თბილისი": [
    "მარშალ გელოვანის გამზირი #22",
    "ილია ჭავჭავაძის გამზირი #37",
    "უნივერსიტეტის ქუჩა #39",
    "ზვიად გამსახურდიას სანაპირო #80",
    "სპორტის სასახლე",
    "ოთარ ჭილაძის ქუჩა #9",
    "ქერჩის ქუჩა #1"
  ],
};

const sharedScheduleOptions = ["არ მაქვს", "მაქვს 1 წლამდე", "მაქვს 1 წელზე მეტი"];
const sharedLocationOptions = ["თბილისი", "ბათუმი"];

export const applicationOptionsByCard: Record<string, ApplicationOptionSet> = {
  security: {
    positionOptions: [{ label: "დაცვის თანამშრომელი", availableDay: false, availableNight: false }],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  kitchen: {
    positionOptions: [
      { label: "ცხელი კერძების მზარეული", availableDay: false, availableNight: false },
      { label: "ცივი კერძების მზარეული", availableDay: false, availableNight: false },
      { label: "მზარეულის დამხმარე", availableDay: false, availableNight: false },
      { label: "სუშის მზარეული", availableDay: true, availableNight: false },
      { label: "კონდიტერი", availableDay: false, availableNight: false },
      { label: "ჭურჭლის მრეცხავი", availableDay: false, availableNight: false },
      { label: "ხინკლის ცომის სპეციალისტი", availableDay: false, availableNight: false },
    ],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  baker: {
    positionOptions: [
      { label: "პურ-ფუნთუშეულის მცხობელი", availableDay: false, availableNight: false },
      { label: "თონის პურის მცხობელი", availableDay: false, availableNight: false },
      { label: "ხაჭაპურის მცხობელი", availableDay: true, availableNight: false },
    ],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  butchery: {
    positionOptions: [
      { label: "თევზის ყასაბი", availableDay: false, availableNight: false },
      { label: "ხორცის ყასაბი", availableDay: false, availableNight: false },
    ],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  cashier: {
    positionOptions: [
      { label: "მოლარე", availableDay: true, availableNight: false },
    ],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  cashiernight: {
    positionOptions: [
      { label: "ღამის ცვლის მოლარე", availableDay: false, availableNight: true },
    ],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  service: {
    positionOptions: [
      { label: "კონსულტანტი", availableDay: true, availableNight: false },
    ],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  servicenight: {
    positionOptions: [
      { label: "ღამის ცვლის კონსულტანტი", availableDay: false, availableNight: true },
    ],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  warehouse: {
    positionOptions: [
      { label: "საწყობის თანამშრომელი", availableDay: false, availableNight: false },
      { label: "წარმოების დამხმარე თანამშრომელი", availableDay: false, availableNight: false },
    ],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  delivery: {
    positionOptions: [
      { label: "მიტანის სერვისის კონსულტანტი(ფიქერი)", availableDay: false, availableNight: false },

    ],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  deliverynight: {
    positionOptions: [
      { label: "ღამის მიტანის სერვისის კონსულტანტი(ფიქერი)", availableDay: false, availableNight: true },
   
    ],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
};

const resolvePositionOptions = (
  options: PositionOptionConfig[],
  shift: Shift,
): ResolvedPositionOption[] =>
  options.map((option) => ({
    label: option.label,
    available: shift === "night" ? option.availableNight : option.availableDay,
  }));

export const getApplicationOptions = (
  cardId: string | null | undefined,
  shift: Shift,
): ResolvedApplicationOptionSet => {
  const base = cardId ? applicationOptionsByCard[cardId] : undefined;
  const fallback = base ?? applicationOptionsByCard.default;

  return {
    positionOptions: resolvePositionOptions(fallback.positionOptions, shift),
    scheduleOptions: fallback.scheduleOptions,
    locationOptions: fallback.locationOptions,
  };
};

export type ResolvedCardShift = {
  cardKey: string | null;
  heroId: string | null;
  shift: Shift;
};

export const resolveCardShift = (
  cardId: string | null | undefined,
  fallbackShift: Shift,
): ResolvedCardShift => {
  if (!cardId) {
    return { cardKey: null, heroId: null, shift: fallbackShift };
  }

  const match = cardId.match(/^(.*?)(day|night|dark)$/i);
  if (match) {
    const base = match[1] || "";
    const suffix = match[2].toLowerCase();
    const shiftFromCard: Shift = suffix === "night" || suffix === "dark" ? "night" : "day";
    const cardKey = suffix === "day" ? base : `${base}night`;
    return { cardKey: cardKey || null, heroId: base || null, shift: shiftFromCard };
  }

  return { cardKey: cardId, heroId: cardId, shift: fallbackShift };
};
