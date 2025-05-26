import { z } from "zod";

const getTeamShortNameSchema = () =>
  z
    .string({ required_error: "zod.errors.required.team_name" })
    .min(5, "zod.errors.invalid.team_name_too_short")
    .max(12, "zod.errors.invalid.team_name_too_long");

const getTeamNameSchema = () =>
  z
    .string({ required_error: "zod.errors.required.team_name" })
    .min(5, "zod.errors.invalid.team_name_too_short")
    .max(20, "zod.errors.invalid.team_name_too_long");

// Team Creation

export const createTeamSchema = z.object({
  team_short_name: getTeamShortNameSchema(),
  team_name: getTeamNameSchema(),
});

export type TCreateTeam = z.infer<typeof createTeamSchema>;
