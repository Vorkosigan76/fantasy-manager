"server-only";

import { getTeamsByUserId } from "@/data/teams/team";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CreateTeamStep2() {
  const user = await getCurrentUser();
  const teams = user ? await getTeamsByUserId(user.id) : undefined;

  if (!teams || teams.length == 0) {
    redirect("/private/home");
  }

  return <div className="w-full flex justify-center">STEP2</div>;
}
