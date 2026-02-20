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

const positionTrackingSlugByLabel: Record<string, string> = {
  "დაცვის თანამშრომელი": "dacvis-tanamshromeli",
  "ცხელი კერძების მზარეული": "cxeli-kerdzebis-mzareuli",
  "ცივი კერძების მზარეული": "civi-kerdzebis-mzareuli",
  "მზარეულის დამხმარე": "mzareulis-damxmare",
  "სუშის მზარეული": "sushis-mzareuli",
  "კონდიტერი": "konditeri",
  "ჭურჭლის მრეცხავი": "churchlis-mrecxavi",
  "ხინკლის ცომის სპეციალისტი": "xinklis-comis-specialisti",
  "პურ-ფუნთუშეულის მცხობელი": "pur-funtusheulis-mcxobeli",
  "თონის პურის მცხობელი": "tonis-puris-mcxobeli",
  "ხაჭაპურის მცხობელი": "xachapuris-mcxobeli",
  "თევზის ყასაბი": "tevzis-yasabi",
  "ხორცის ყასაბი": "xorcis-yasabi",
  "მოლარე": "molare",
  "ღამის ცვლის მოლარე": "ghamis-cvlis-molare",
  "კონსულტანტი": "konsultanti",
  "ღამის ცვლის კონსულტანტი": "ghamis-cvlis-konsultanti",
  "საწყობის თანამშრომელი": "sawyobis-tanamshromeli",
  "წარმოების დამხმარე თანამშრომელი": "warmoebis-damxmare-tanamshromeli",
  "მიტანის სერვისის კონსულტანტი(ფიქერი)": "mitanis-servisis-konsulanti-piqeri",
  "ღამის მიტანის სერვისის კონსულტანტი(ფიქერი)": "ghamis-mitanis-servisis-konsulanti-fiqeri",
};

const positionLabelByTrackingSlug: Record<string, string> = Object.fromEntries(
  Object.entries(positionTrackingSlugByLabel).map(([label, slug]) => [slug, label]),
);

export const getPositionTrackingSlug = (positionLabel: string): string => {
  const normalizedLabel = positionLabel.trim();
  return positionTrackingSlugByLabel[normalizedLabel] ?? "unknown-pozicia";
};

export const getPositionLabelFromTrackingSlug = (trackingSlug: string): string | null => {
  const normalizedSlug = trackingSlug.trim().toLowerCase();
  return positionLabelByTrackingSlug[normalizedSlug] ?? null;
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
    positionOptions: [{ label: "დაცვის თანამშრომელი", availableDay: true, availableNight: true }],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  kitchen: {
    positionOptions: [
      { label: "ცხელი კერძების მზარეული", availableDay: true, availableNight: false },
      { label: "ცივი კერძების მზარეული", availableDay: true, availableNight: false },
      { label: "მზარეულის დამხმარე", availableDay: false, availableNight: false },
      { label: "სუშის მზარეული", availableDay: false, availableNight: false },
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
      { label: "ხაჭაპურის მცხობელი", availableDay: false, availableNight: false },
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
      { label: "მოლარე", availableDay: false, availableNight: false },
    ],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  cashiernight: {
    positionOptions: [
      { label: "ღამის ცვლის მოლარე", availableDay: false, availableNight: false },
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
      { label: "საწყობის თანამშრომელი", availableDay: true, availableNight: false },
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
      { label: "ღამის მიტანის სერვისის კონსულტანტი(ფიქერი)", availableDay: false, availableNight: false },
   
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
  const fallbackOptions: ApplicationOptionSet = {
    positionOptions: [],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  };
  const base = cardId ? applicationOptionsByCard[cardId] : undefined;
  const fallback = base ?? fallbackOptions;

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
