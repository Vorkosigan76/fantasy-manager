import { Prisma } from "@/generated/prisma";

export const cultureData: Prisma.CultureCreateInput[] = [
  {
    id: "human-occitan",
    race: {
      connect: { id: "human" },
    },
    i18n: {
      create: [
        { language: "en", name: "Human" },
        { language: "fr", name: "Humain" },
      ],
    },
  },
];
