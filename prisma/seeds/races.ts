import { Prisma } from "@/generated/prisma";

export const raceData: Prisma.RaceCreateInput[] = [
  {
    id: "human",
    i18n: {
      create: [
        { language: "en", name: "Human" },
        { language: "fr", name: "Humain" },
      ],
    },
  },
];
