import { PrismaClient } from "../src/generated/prisma";
import { buildingTypeData } from "./seeds/building-types";
import { locationData } from "./seeds/locations";
import { regionData } from "./seeds/regions";
import { routeData } from "./seeds/routes";

const prisma = new PrismaClient();

export async function main() {
  for (const u of buildingTypeData) {
    await prisma.buildingType.create({ data: u });
  }
  for (const u of regionData) {
    await prisma.region.create({ data: u });
  }
  for (const u of locationData) {
    await prisma.location.create({ data: u });
  }
  for (const u of routeData) {
    await prisma.route.create({ data: u });
  }
}

main();
