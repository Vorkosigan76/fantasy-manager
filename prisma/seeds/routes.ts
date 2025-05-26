import { Prisma } from "@/generated/prisma";

export const routeData: Prisma.RouteCreateInput[] = [
  {
    type: "road_paved",
    distance: 50,
    locationFrom: {
      connect: { id: "castillon" },
    },
    locationTo: {
      connect: { id: "artus" },
    },
  },
  {
    type: "road_paved",
    distance: 50,
    locationFrom: {
      connect: { id: "artus" },
    },
    locationTo: {
      connect: { id: "castillon" },
    },
  },
  {
    type: "road_paved",
    distance: 35,
    locationFrom: {
      connect: { id: "castelnau" },
    },
    locationTo: {
      connect: { id: "montmiral" },
    },
  },
  {
    type: "road_paved",
    distance: 35,
    locationFrom: {
      connect: { id: "montmiral" },
    },
    locationTo: {
      connect: { id: "castelnau" },
    },
  },
  {
    type: "road_paved",
    distance: 40,
    locationFrom: {
      connect: { id: "castillon" },
    },
    locationTo: {
      connect: { id: "montmiral" },
    },
  },
  {
    type: "road_paved",
    distance: 40,
    locationFrom: {
      connect: { id: "montmiral" },
    },
    locationTo: {
      connect: { id: "castillon" },
    },
  },
];
