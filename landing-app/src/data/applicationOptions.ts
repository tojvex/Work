export type ApplicationOptionSet = {
  positionOptions: string[];
  scheduleOptions: string[];
  locationOptions: string[];
};

export const streetOptionsByCity: Record<string, string[]> = {
  "თბილისი": [
    "მარშალ გელოვანის გამზირი #22",
    "ილია ჭავჭავაძის გამზ. #37",
    "უნივერსიტეტის ქუჩა #39",
    "ზვიად გამსახურდიას სანაპირო #80",
    "სპორტის სასახლე",
    "ოთარ ჭილაძის ქუჩა #9",
    "ქერჩის ქუჩა #1"
  ],
};

const sharedScheduleOptions = [
  "არ მაქვს",
  "მაქვს, 1 წლამდე",
  "მაქვს, 1 წელზე მეტი",
];

const sharedLocationOptions = [
  "თბილისი",
  "ქუთაისი",
  "ბათუმი",
];

export const applicationOptionsByCard: Record<string, ApplicationOptionSet> = {
  default: {
    positionOptions: ["General position placeholder 1", "General position placeholder 2"],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  security: {
    positionOptions: [
      "დაცვის თანამშრომელი",
    ],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  kitchen: {
    positionOptions: [
      "ცხელი კერძების მზარეული",
      "ცივი კერძების მზარეული",
      "მზარეულის დამხმარე",
      "სუშის მზარეული",
      "კონდიტერი",
      "ჭურჭლის მრეცხავი",
      "ხინკლის ცომის სპეციალისტი"
    ],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  baker: {
    positionOptions: [
      "პურ-ფუნთუშეულის მცხობელი",
      "თონის პურის მცხობელი",
      "ხაჭაპურის მცხობელი"
    ],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  butchery: {
    positionOptions: [
      "თევზის ყასაბი",
      "ხორცის ყასაბი",
    ],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  cashier: {
    positionOptions: [
      "მოლარე",
      "ღამის ცვლის მოლარე",
    ],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  service: {
    positionOptions: [
      "კონსულტანტი",
      "ღამის ცვლის კონსულტანტი",
    ],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  warehouse: {
    positionOptions: [
      "საწყობის თანამშრომელი",
      "წარმოების დამხმარე თანამშრომელი",
    ],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
  delivery: {
    positionOptions: [
      "მიტანის სერვისის კონსულტანტი(ფიქერი)",
      "ღამის მიტანის სერვისის კონსულტანტი(ფიქერი)",

    ],
    scheduleOptions: sharedScheduleOptions,
    locationOptions: sharedLocationOptions,
  },
};

export const getApplicationOptions = (cardId: string | null | undefined) => {
  if (!cardId) {
    return applicationOptionsByCard.default;
  }

  return applicationOptionsByCard[cardId] ?? applicationOptionsByCard.default;
};
