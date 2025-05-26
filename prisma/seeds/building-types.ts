import { Prisma } from "@/generated/prisma";

export const buildingTypeData: Prisma.BuildingTypeCreateInput[] = [
  {
    id: "stadium",
    i18n: {
      create: [
        { language: "en", name: "Stadium" },
        { language: "fr", name: "Stade" },
      ],
    },
  },
  {
    id: "tavern",
    i18n: {
      create: [
        { language: "en", name: "Tavern" },
        { language: "fr", name: "Taverne" },
      ],
    },
  },
];
