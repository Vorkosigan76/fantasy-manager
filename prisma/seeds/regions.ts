import { Prisma } from "@/generated/prisma";

export const regionData: Prisma.RegionCreateInput[] = [
  {
    id: "gers",
    i18n: {
      create: [
        { language: "en", name: "County of Gers" },
        { language: "fr", name: "Comté du Gers" },
      ],
    },
  },
  {
    id: "anterre",
    i18n: {
      create: [
        { language: "en", name: "Forest of Anterre" },
        { language: "fr", name: "Forêt d'Anterre'" },
      ],
    },
  },
];

export const regionPopulationData: Prisma.RegionPopulationCreateInput[] = [
  {
    id: "gers_human_occitan",
    region: {
      connect: { id: "gers" },
    },
    culture: {
      connect: { id: "human-occitan" },
    },
    percentage: 100,
  },
];
