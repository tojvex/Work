import type { StaticImageData } from "next/image";

import Security from "@/media/Security.webp";
import SecurityMobile from "@/media/SecurityMobile.webp";
import Baker from "@/media/TONE.webp";
import BakerMobile from "@/media/TONEMobile.webp";
import Kitchen from "@/media/Kitchen.webp";
import KitchenMobile from "@/media/KitchenMobile.webp";
import KitchenHover from "@/media/kitchenhover.webp";
import KitchenHoverDark from "@/media/kitchenhoverdark.webp";
import KitchenHoverMobile from "@/media/kitchenhoverMobile.webp";
import KitchenHoverMobileDark from "@/media/kitchenhoverMobileDark.webp";
import Butchery from "@/media/Butchery.webp";
import ButcheryMobile from "@/media/ButcheryMobile.webp";
import ButcheryHover from "@/media/butcheryhover.webp";
import ButcheryHoverDark from "@/media/butcheryhoverdark.webp";
import ButcheryHoverMobile from "@/media/butcheryhoverMobile.webp";
import ButcheryHoverMobileDark from "@/media/butcheryhoverMobileDark.webp";
import Cashier from "@/media/Cashier.webp";
import CashierMobile from "@/media/CashierMobile.webp";
import MainScene from "@/media/Main.webp";
import MainMobile from "@/media/MainMobile.webp";
import Warehouse from "@/media/Warehouse.webp";
import WarehouseMobile from "@/media/WarehouseMobile.webp";
import WarehouseDarkMode from "@/media/warehouseDarkMode.webp";
import WarehouseHover from "@/media/warehousehover.webp";
import Delivery from "@/media/Delivery.webp";
import CourierMobile from "@/media/CourierMobile.webp";
import SecurityHover from "@/media/securityhover.webp";
import SecurityHoverDark from "@/media/securityhoverdark.webp";
import BakerHover from "@/media/tonehover.webp";
import BakerHoverDark from "@/media/tonehoverdark.webp";
import CashierHover from "@/media/cashierhover.webp";
import CashierHoverDark from "@/media/cashierhoverdark.webp";
import MainSceneHover from "@/media/mainhover.webp";
import MainSceneHoverDark from "@/media/mainhoverdark.webp";
import DeliveryHover from "@/media/deliveryhover.webp";
import DeliveryHoverDark from "@/media/deliveryhoverdark.webp";
import SecurityHoverMobile from "@/media/securityhoverMobile.webp";
import BakerHoverMobile from "@/media/tonehoverMobile.webp";
import CashierHoverMobile from "@/media/cashierhoverMobile.webp";
import MainHoverMobile from "@/media/mainhoverMobile.webp";
import WarehouseHoverMobile from "@/media/warehousehoverMobile.webp";
import SecurityHoverMobileDark from "@/media/securityhoverMobileDark.webp";
import BakerHoverMobileDark from "@/media/tonehoverMobileDark.webp";
import CashierHoverMobileDark from "@/media/cashierhoverMobileDark.webp";
import MainHoverMobileDark from "@/media/mainhoverMobileDark.webp";
import SecurityCard from "@/media/SecurityCard.webp";
import BakeryCard from "@/media/BakeryCard.webp";
import KitchenCard from "@/media/KitchenCard.webp";
import ButcheryCard from "@/media/ButcheryCard.webp";
import CashierCard from "@/media/CashierCard.webp";
import CashierCardDark from "@/media/CashierCardDark.webp";
import ServiceCard from "@/media/ServiceCard.webp";
import ServiceCardDark from "@/media/ServiceCardDark.webp";
import DeliveryCard from "@/media/DeliveryCard.webp";
import DeliveryCardDark from "@/media/DeliveryCardDark.webp";
import WarehouseCard from "@/media/WarehouseCard.webp";

export const HEADLINE =
  "იპოვე შენი სივრცე აგროჰაბში"

export type HeroCardDetails = {
  image: StaticImageData;
  darkImage?: StaticImageData;
  heading: string;
  points: string[];
};

export type HeroItem = {
  id: string;
  availableDay: boolean;
  availableNight: boolean;
  lightSrc: StaticImageData;
  darkSrc?: StaticImageData;
  hoverLightSrc: StaticImageData;
  hoverDarkSrc?: StaticImageData;
  alt: string;
  desktopClass: string;
  mobileLightSrc: StaticImageData;
  mobileDarkSrc?: StaticImageData;
  mobileHoverLightSrc?: StaticImageData;
  mobileHoverDarkSrc?: StaticImageData;
  mobileClass: string;
  card?: HeroCardDetails;
};

export type HeroItemWithCard = HeroItem & { card: HeroCardDetails };

export const heroItems: HeroItem[] = [
  {
    id: "security",
    availableDay: true,
    availableNight: true,
    lightSrc: Security,
    darkSrc: Security,
    hoverLightSrc: SecurityHover,
    hoverDarkSrc: SecurityHoverDark,
    alt: "Security guard standing near a store entrance",
    desktopClass: "left-[13%] top-[6%] w-[16%]",
    mobileLightSrc: SecurityMobile,
    mobileHoverLightSrc: SecurityHoverMobile,
    mobileHoverDarkSrc: SecurityHoverMobileDark,
    mobileClass: "left-[3%] top-[8%] w-[34%]",
    card: {
      image: SecurityCard,
      heading: "\u10d3\u10d0\u10ea\u10d5\u10d0",
      points: ["\u10d3\u10d0\u10ea\u10d5\u10d8\u10e1 \u10d7\u10d0\u10dc\u10d0\u10db\u10e9\u10dd\u10e0\u10d4\u10d1\u10da\u10d8"],
    },
  },
  {
    id: "baker",
    availableDay: false,
    availableNight: false,
    lightSrc: Baker,
    darkSrc: Baker,
    hoverLightSrc: BakerHover,
    hoverDarkSrc: BakerHoverDark,
    alt: "Baker preparing fresh bread",
    desktopClass: "left-[31%] top-[4%] w-[14%]",
    mobileLightSrc: BakerMobile,
    mobileDarkSrc: BakerMobile,
    mobileHoverLightSrc: BakerHoverMobile,
    mobileHoverDarkSrc: BakerHoverMobileDark,
    mobileClass: "left-[37%] top-[52%] w-[30%]",
    card: {
      image: BakeryCard,
      heading: "\u10e1\u10d0\u10ee\u10d4\u10da\u10d1\u10d8",
      points: [
        "\u10de\u10d0\u10e0-\u10e4\u10d4\u10e0\u10db\u10d4\u10dc\u10e2\u10db\u10d4\u10da\u10d8 \u10db\u10d7\u10e1\u10dd\u10d1\u10d0\u10eb\u10d4",
        "\u10d7\u10dd\u10dc\u10d8\u10e1 \u10de\u10e3\u10e0\u10d8\u10e1 \u10db\u10d7\u10e1\u10dd\u10d1\u10d0\u10eb\u10d4",
        "\u10ee\u10d0\u10d7\u10d0\u10db\u10e0\u10d8\u10e1 \u10db\u10d7\u10e1\u10dd\u10d1\u10d0\u10eb\u10d4",
      ],
    },
  },
  {
    id: "kitchen",
    availableDay: true,
    availableNight: false,
    lightSrc: Kitchen,
    darkSrc: Kitchen,
    hoverLightSrc: KitchenHover,
    hoverDarkSrc: KitchenHoverDark,
    alt: "Prepared food station inside a kitchen",
    desktopClass: "left-[50%] top-[10%] w-[17%]",
    mobileLightSrc: KitchenMobile,
    mobileDarkSrc: KitchenMobile,
    mobileHoverLightSrc: KitchenHoverMobile,
    mobileHoverDarkSrc: KitchenHoverMobileDark,
    mobileClass: "left-[42%] top-[8%] w-[38%]",
    card: {
      image: KitchenCard,
      heading: "\u10e1\u10d0\u10db\u10d6\u10d0\u10e0\u10e3\u10da\u10dd",
      points: [
        "\u10e1\u10e2\u10e3\u10db\u10d8 \u10db\u10e3\u10e0\u10d8\u10e1 \u10db\u10e7\u10d0\u10e0\u10d8",
        "\u10ea\u10d8\u10e2\u10d8 \u10d4\u10e0\u10d3\u10d6\u10d8\u10e1 \u10db\u10e7\u10d0\u10e0\u10d8",
        "\u10db\u10e1\u10ee\u10d4\u10d5\u10e0\u10d4\u10e3\u10da\u10d8\u10e1 \u10d3\u10d0\u10e1\u10d0\u10d1\u10d0\u10e0\u10d4",
        "\u10e1\u10d0\u10da\u10d8 \u10db\u10d6\u10d0\u10d0\u10d1\u10e0\u10d0\u10d3\u10d8",
        "\u10d9\u10dd\u10dd\u10e0\u10d3\u10d8\u10dc\u10d0\u10e2\u10dd\u10e0\u10d8",
        "\u10de\u10dd\u10ec\u10dc\u10d8\u10e1 \u10db\u10d6\u10d0\u10d0\u10db\u10d0\u10e0\u10d4\u10d1\u10df\u10d4",
        "\u10d8\u10dc\u10d4\u10e0\u10d7\u10e3\u10da\u10d8 \u10ec\u10dd\u10dc\u10d8\u10e1 \u10e1\u10d4\u10e0\u10d5\u10d8\u10e1\u10d9\u10dd\u10dc\u10e1\u10d8\u10da\u10d8\u10d7\u10d8",
      ],
    },
  },
  {
    id: "butchery",
    availableDay: false,
    availableNight: false,
    lightSrc: Butchery,
    darkSrc: Butchery,
    hoverLightSrc: ButcheryHover,
    hoverDarkSrc: ButcheryHoverDark,
    alt: "Butcher working at a meat station",
    desktopClass: "left-[72%] top-[6%] w-[14%]",
    mobileLightSrc: ButcheryMobile,
    mobileDarkSrc: ButcheryMobile,
    mobileHoverLightSrc: ButcheryHoverMobile,
    mobileHoverDarkSrc: ButcheryHoverMobileDark,
    mobileClass: "left-[75%] top-[14%] w-[23%]",
    card: {
      image: ButcheryCard,
      heading: "\u10e1\u10d0\u10ee\u10e8\u10dd\u10d1\u10d8",
      points: [
        "\u10d7\u10d5\u10d8\u10e1\u10d8\u10e1 \u10dc\u10d0\u10e8\u10d0\u10d3\u10d0\u10d1\u10d8",
        "\u10ee\u10dd\u10e0\u10ea\u10d8\u10e1 \u10dc\u10d0\u10e8\u10d0\u10d3\u10d0\u10d1\u10d8",
      ],
    },
  },
  {
    id: "cashier",
    availableDay: false,
    availableNight: false,
    lightSrc: Cashier,
    darkSrc: Cashier,
    hoverLightSrc: CashierHover,
    hoverDarkSrc: CashierHoverDark,
    alt: "Cashier operating a point-of-sale terminal",
    desktopClass: "left-[22%] top-[32%] w-[18%]",
    mobileLightSrc: CashierMobile,
    mobileHoverLightSrc: CashierHoverMobile,
    mobileHoverDarkSrc: CashierHoverMobileDark,
    mobileClass: "left-[4%] top-[50%] w-[32%]",
    card: {
      image: CashierCard,
      darkImage: CashierCardDark,
      heading: "\u10e1\u10d0\u10da\u10d0\u10e0\u10d4",
      points: [
        "\u10db\u10da\u10d0\u10e0\u10d8",
        "\u10da\u10d0\u10e1\u10d8\u10e1 \u10ea\u10e7\u10da\u10d8\u10e1 \u10db\u10da\u10d0\u10e0\u10d8",
      ],
    },
  },
  {
    id: "service",
    availableDay: true,
    availableNight: true,
    lightSrc: MainScene,
    darkSrc: MainScene,
    hoverLightSrc: MainSceneHover,
    hoverDarkSrc: MainSceneHoverDark,
    alt: "Employee organizing products on shelves",
    desktopClass: "left-[34%] top-[28%] w-[40%]",
    mobileLightSrc: MainMobile,
    mobileHoverLightSrc: MainHoverMobile,
    mobileHoverDarkSrc: MainHoverMobileDark,
    mobileClass: "left-[28%] top-[28%] w-[55%]",
    card: {
      image: ServiceCard,
      darkImage: ServiceCardDark,
      heading: "\u10e1\u10d4\u10e0\u10d5\u10d8\u10e1\u10d8",
      points: [
        "\u10d9\u10dd\u10dc\u10e1\u10e3\u10da\u10e2\u10d0\u10dc\u10e2\u10d8",
        "\u10da\u10d0\u10e1\u10d8 \u10ea\u10d5\u10d4\u10da\u10d8\u10e1 \u10d9\u10dd\u10dc\u10e1\u10e3\u10da\u10e2\u10d0\u10dc\u10e2\u10d8",
        "\u10db\u10d8\u10d7\u10d0\u10dc\u10d8\u10e1 \u10e1\u10d4\u10e0\u10d5\u10d8\u10e1\u10d8\u10e1 \u10d9\u10dd\u10dc\u10e1\u10e3\u10da\u10e2\u10d0\u10dc\u10e2\u10d8",
      ],
    },
  },
  {
    id: "warehouse",
    availableDay: true,
    availableNight: false,
    lightSrc: Warehouse,
    darkSrc: Warehouse,
    hoverLightSrc: WarehouseHover,
    hoverDarkSrc: WarehouseDarkMode,
    alt: "Warehouse worker moving packaged goods",
    desktopClass: "left-[66%] top-[41%] w-[22%]",
    mobileLightSrc: WarehouseMobile,
    mobileDarkSrc: WarehouseMobile,
    mobileHoverLightSrc: WarehouseHoverMobile,
    mobileHoverDarkSrc: WarehouseDarkMode,
    mobileClass: "left-[64%] top-[38%] w-[35%]",
    card: {
      image: WarehouseCard,
      heading: "\u10e1\u10d0\u10d2\u10e7\u10dd\u10d1\u10d8",
      points: [
        "\u10e1\u10d0\u10ec\u10ee\u10d8\u10e1 \u10d7\u10d0\u10dc\u10d0\u10e8\u10dd\u10db\u10d4\u10da\u10d8",
        "\u10ef\u10e7\u10e3\u10d1\u10d8\u10e1 \u10d3\u10d0\u10db\u10ec\u10db\u10d4\u10d1\u10d4\u10e0\u10d8 \u10d7\u10d0\u10dc\u10d0\u10e8\u10dd\u10db\u10d4\u10da\u10d8",
        "\u10e1\u10d0\u10ec\u10ee\u10d4\u10d1\u10d4\u10e1 \u10e1\u10d0\u10ee\u10d5\u10d8\u10e1\u10dd \u10d3\u10d0\u10eb\u10d0\u10db\u10d8\u10d3\u10d4\u10d1\u10d0",
      ],
    },
  },
  {
    id: "delivery",
    availableDay: false,
    availableNight: false,
    lightSrc: Delivery,
    darkSrc: Delivery,
    hoverLightSrc: DeliveryHover,
    hoverDarkSrc: DeliveryHoverDark,
    alt: "Delivery courier arriving on a scooter",
    desktopClass: "left-[10%] top-[48%] w-[16%]",
    mobileLightSrc: CourierMobile,
    mobileHoverLightSrc: DeliveryHover,
    mobileHoverDarkSrc: DeliveryHoverDark,
    mobileClass: "left-[0%] top-[32%] w-[29%]",
    card: {
      image: DeliveryCard,
      darkImage: DeliveryCardDark,
      heading: "\u10db\u10d8\u10d7\u10d0\u10dc\u10d8\u10e1 \u10e1\u10d4\u10e0\u10d5\u10d8\u10e1\u10d8",
      points: [
        "\u10d0\u10e0\u10dd\u10ec\u10d8, \u10e0\u10dd\u10db\u10d4\u10da \u10d9\u10dd\u10db\u10de\u10d0\u10dc\u10d8\u10d0\u10d6\u10d4 \u10db\u10e1\u10d0\u10d5\u10e1 \u10d3\u10d0\u10d3\u10e1\u10d0\u10e7\u10d0\u10da\u10d4\u10d1\u10d0",
        "\u10db\u10d8\u10d7\u10d0\u10dc\u10d8\u10e1 \u10e1\u10d4\u10e0\u10d5\u10d8\u10e1\u10d8\u10e1 \u10d9\u10dd\u10dc\u10e1\u10e3\u10da\u10e2\u10d0\u10dc\u10e2\u10d8",
      ],
    },
  },
];







