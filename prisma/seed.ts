import { PrismaClient } from "../src/generated/prisma";
import { buildingTypeData } from "./seeds/building-types";
import { cultureData } from "./seeds/cultures";
import { locationData } from "./seeds/locations";
import { raceData } from "./seeds/races";
import { regionData, regionPopulationData } from "./seeds/regions";
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

  for (const u of raceData) {
    await prisma.race.create({ data: u });
  }
  for (const u of cultureData) {
    await prisma.culture.create({ data: u });
  }
  for (const u of regionPopulationData) {
    await prisma.regionPopulation.create({ data: u });
  }
}

main();
