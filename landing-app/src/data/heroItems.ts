import type { StaticImageData } from "next/image";

import Security from "@/media/Security.png";
import SecurityMobile from "@/media/SecurityMobile.png";
import Baker from "@/media/TONE.png";
import BakerMobile from "@/media/TONEMobile.png";
import Kitchen from "@/media/Kitchen.png";
import KitchenMobile from "@/media/KitchenMobile.png";
import KitchenDark from "@/media/kitchendark.png";
import Butchery from "@/media/Butchery.png";
import ButcheryMobile from "@/media/ButcheryMobile.png";
import Cashier from "@/media/Cashier.png";
import CashierMobile from "@/media/CashierMobile.png";
import MainScene from "@/media/Main.png";
import MainMobile from "@/media/MainMobile.png";
import Warehouse from "@/media/Warehouse.png";
import WarehouseMobile from "@/media/WarehouseMobile.png";
import WarehouseDark from "@/media/warehousedark.png";
import Delivery from "@/media/Delivery.png";
import CourierMobile from "@/media/CourierMobile.png";
import SecurityHover from "@/media/securityhover.png";
import SecurityHoverDark from "@/media/securityhoverdark.png";
import BakerHover from "@/media/tonehover.png";
import BakerHoverDark from "@/media/tonehoverdark.png";
import KitchenHover from "@/media/kitchenhover.png";
import KitchenHoverDark from "@/media/kitchenhoverdark.png";
import ButcheryHover from "@/media/butcheryhover.png";
import ButcheryHoverDark from "@/media/butcheryhoverdark.png";
import CashierHover from "@/media/cashierhover.png";
import CashierHoverDark from "@/media/cashierhoverdark.png";
import MainSceneHover from "@/media/mainhover.png";
import MainSceneHoverDark from "@/media/mainhoverdark.png";
import WarehouseHover from "@/media/warehousehover.png";
import WarehouseHoverDark from "@/media/warehousehoverdark.png";
import DeliveryHover from "@/media/deliveryhover.png";
import DeliveryHoverDark from "@/media/deliveryhoverdark.png";
import SecurityHoverMobile from "@/media/securityhoverMobile.png";
import BakerHoverMobile from "@/media/tonehoverMobile.png";
import KitchenHoverMobile from "@/media/kitchenhoverMobile.png";
import ButcheryHoverMobile from "@/media/butcheryhoverMobile.png";
import CashierHoverMobile from "@/media/cashierhoverMobile.png";
import MainHoverMobile from "@/media/mainhoverMobile.png";
import WarehouseHoverMobile from "@/media/warehousehoverMobile.png";
import DeliveryHoverMobile from "@/media/deliveryhoverMobile.png";
import SecurityHoverMobileDark from "@/media/securityhoverMobileDark.png";
import BakerHoverMobileDark from "@/media/tonehoverMobileDark.png";
import KitchenHoverMobileDark from "@/media/kitchenhoverMobileDark.png";
import ButcheryHoverMobileDark from "@/media/butcheryhoverMobileDark.png";
import CashierHoverMobileDark from "@/media/cashierhoverMobileDark.png";
import MainHoverMobileDark from "@/media/mainhoverMobileDark.png";
import WarehouseHoverMobileDark from "@/media/warehousehoverMobileDark.png";
import DeliveryHoverMobileDark from "@/media/deliveryhoverMobileDark.png";
import SecurityCard from "@/media/SecurityCard.png";
import BakeryCard from "@/media/BakeryCard.png";
import KitchenCard from "@/media/KitchenCard.png";
import ButcheryCard from "@/media/ButcheryCard.png";
import CashierCard from "@/media/CashierCard.png";
import ServiceCard from "@/media/ServiceCard.png";
import WarehouseCard from "@/media/WarehouseCard.png";

export const HEADLINE =
  "\u10e0\u10dd\u10db\u10d4\u10da\u0020\u10e1\u10d4\u10e5\u10ea\u10d8\u10d0\u10e8\u10d8\u0020\u10d2\u10e1\u10e3\u10e0\u10e1\u0020\u10d3\u10d0\u10e1\u10d0\u10e5\u10db\u10d4\u10d1\u10d0\u003f";

export type HeroCardDetails = {
  image: StaticImageData;
  heading: string;
  points: string[];
};

export type HeroItem = {
  id: string;
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
    lightSrc: Security,
    darkSrc: Security,
    hoverLightSrc: SecurityHover,
    hoverDarkSrc: SecurityHoverDark,
    alt: "Security guard standing near a store entrance",
    desktopClass: "left-[12%] top-[24%] w-[16%]",
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
    lightSrc: Baker,
    darkSrc: Baker,
    hoverLightSrc: BakerHover,
    hoverDarkSrc: BakerHoverDark,
    alt: "Baker preparing fresh bread",
    desktopClass: "left-[33%] top-[20%] w-[14%]",
    mobileLightSrc: BakerMobile,
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
    lightSrc: Kitchen,
    darkSrc: KitchenDark,
    hoverLightSrc: KitchenHover,
    hoverDarkSrc: KitchenHoverDark,
    alt: "Prepared food station inside a kitchen",
    desktopClass: "left-[50%] top-[22%] w-[17%]",
    mobileLightSrc: KitchenMobile,
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
    lightSrc: Butchery,
    darkSrc: Butchery,
    hoverLightSrc: ButcheryHover,
    hoverDarkSrc: ButcheryHoverDark,
    alt: "Butcher working at a meat station",
    desktopClass: "left-[72%] top-[16%] w-[14%]",
    mobileLightSrc: ButcheryMobile,
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
    lightSrc: Cashier,
    darkSrc: Cashier,
    hoverLightSrc: CashierHover,
    hoverDarkSrc: CashierHoverDark,
    alt: "Cashier operating a point-of-sale terminal",
    desktopClass: "left-[22%] top-[46%] w-[18%]",
    mobileLightSrc: CashierMobile,
    mobileHoverLightSrc: CashierHoverMobile,
    mobileHoverDarkSrc: CashierHoverMobileDark,
    mobileClass: "left-[4%] top-[50%] w-[32%]",
    card: {
      image: CashierCard,
      heading: "\u10e1\u10d0\u10da\u10d0\u10e0\u10d4",
      points: [
        "\u10db\u10da\u10d0\u10e0\u10d8",
        "\u10da\u10d0\u10e1\u10d8\u10e1 \u10ea\u10e7\u10da\u10d8\u10e1 \u10db\u10da\u10d0\u10e0\u10d8",
      ],
    },
  },
  {
    id: "service",
    lightSrc: MainScene,
    darkSrc: MainScene,
    hoverLightSrc: MainSceneHover,
    hoverDarkSrc: MainSceneHoverDark,
    alt: "Employee organizing products on shelves",
    desktopClass: "left-[34%] top-[42%] w-[44%]",
    mobileLightSrc: MainMobile,
    mobileHoverLightSrc: MainHoverMobile,
    mobileHoverDarkSrc: MainHoverMobileDark,
    mobileClass: "left-[28%] top-[28%] w-[55%]",
    card: {
      image: ServiceCard,
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
    lightSrc: Warehouse,
    darkSrc: WarehouseDark,
    hoverLightSrc: WarehouseHover,
    hoverDarkSrc: WarehouseHoverDark,
    alt: "Warehouse worker moving packaged goods",
    desktopClass: "left-[70%] top-[57%] w-[22%]",
    mobileLightSrc: WarehouseMobile,
    mobileHoverLightSrc: WarehouseHoverMobile,
    mobileHoverDarkSrc: WarehouseHoverMobileDark,
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
    lightSrc: Delivery,
    darkSrc: Delivery,
    hoverLightSrc: DeliveryHover,
    hoverDarkSrc: DeliveryHoverDark,
    alt: "Delivery courier arriving on a scooter",
    desktopClass: "left-[10%] top-[62%] w-[18%]",
    mobileLightSrc: CourierMobile,
    mobileHoverLightSrc: DeliveryHoverMobile,
    mobileHoverDarkSrc: DeliveryHoverMobileDark,
    mobileClass: "left-[0%] top-[32%] w-[29%]",
  },
];
