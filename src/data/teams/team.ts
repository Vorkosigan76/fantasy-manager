"use server";

import { auth, getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createTeamSchema, TCreateTeam } from "@/lib/schemas/private";

export const getTeamById = async (id: string) => {
  try {
    const team = await prisma.team.findUnique({
      where: { id },
    });
    return team;
  } catch (error) {
    console.error("Error fetching team:", error);
    return null;
  }
};

export const getTeamsByUserId = async (userId: string) => {
  try {
    const teams = await prisma.team.findMany({
      where: { ownerId: userId },
    });
    return teams;
  } catch (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
};

export async function createTeam(values: TCreateTeam) {
  const validatedFields = createTeamSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "fields_invalid" };
  }

  const user = await getCurrentUser();

  const { team_short_name, team_name } = validatedFields.data;

  const team = await prisma.team.create({
    data: {
      name: team_name,
      shortName: team_short_name,
      isActive: true,
      ownerId: user!.id,
    },
  });
  if (!team) {
    return { error: "team_creation_failed" };
  }
  return { team };
}
