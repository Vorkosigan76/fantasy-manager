import { Prisma } from "@/generated/prisma";

export const locationData: Prisma.LocationCreateInput[] = [
  {
    id: "castillon",
    region: {
      connect: { id: "gers" },
    },
    type: "town",
    latitude: 43.6466,
    longitude: 0.5917,
    townInfo: {
      create: {
        population: 7500,
      },
    },
    i18n: {
      create: [
        { language: "en", name: "Castillon" },
        { language: "fr", name: "Castillon" },
      ],
    },
    buildings: {
      create: [
        {
          buildingType: {
            connect: { id: "stadium" },
          },
          stadiumInfo: {
            create: {
              capacity: 10000,
            },
          },

          i18n: {
            create: [
              { language: "en", name: "County Stadium" },
              { language: "fr", name: "Stade Comtal" },
            ],
          },
        },
        {
          buildingType: {
            connect: { id: "tavern" },
          },
        },
      ],
    },
  },
  {
    id: "artus",
    region: {
      connect: { id: "gers" },
    },
    type: "town",
    latitude: 43.7593,
    longitude: 0.3016,
    townInfo: {
      create: {
        population: 3500,
      },
    },
    i18n: {
      create: [
        { language: "en", name: "Artus" },
        { language: "fr", name: "Artus" },
      ],
    },
    buildings: {
      create: [
        {
          buildingType: {
            connect: { id: "stadium" },
          },
          stadiumInfo: {
            create: {
              capacity: 2000,
            },
          },
        },
        {
          buildingType: {
            connect: { id: "tavern" },
          },
        },
      ],
    },
  },
  {
    id: "castelnau",
    region: {
      connect: { id: "gers" },
    },
    type: "town",
    latitude: 43.4264,
    longitude: 0.5884,
    townInfo: {
      create: {
        population: 4200,
      },
    },

    i18n: {
      create: [
        { language: "en", name: "Castelnau" },
        { language: "fr", name: "Castelnau" },
      ],
    },
    buildings: {
      create: [
        {
          buildingType: {
            connect: { id: "stadium" },
          },
          stadiumInfo: {
            create: {
              capacity: 2000,
            },
          },
        },
        {
          buildingType: {
            connect: { id: "tavern" },
          },
        },
      ],
    },
  },
  {
    id: "montmiral",
    region: {
      connect: { id: "gers" },
    },
    type: "town",
    latitude: 43.8165,
    longitude: 0.404,
    townInfo: {
      create: {
        population: 4100,
      },
    },

    i18n: {
      create: [
        { language: "en", name: "Montmiral" },
        { language: "fr", name: "Montmiral" },
      ],
    },
    buildings: {
      create: [
        {
          buildingType: {
            connect: { id: "stadium" },
          },
          stadiumInfo: {
            create: {
              capacity: 2000,
            },
          },
        },
        {
          buildingType: {
            connect: { id: "tavern" },
          },
        },
      ],
    },
  },
];
