"server-only";

import CreateTeamButton from "@/components/private/CreateTeamButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTeamsByUserId } from "@/data/teams/team";
import { getCurrentUser } from "@/lib/auth";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("Private");

  const user = await getCurrentUser();
  const teams = user ? await getTeamsByUserId(user.id) : undefined;

  if (!teams || teams.length === 0) {
    return (
      <div className="w-full flex justify-center">
        <Card className="w-[60%] bg-black text-gray-100 border-0">
          <CardHeader>
            <CardTitle className="text-center">{t("title.welcome")}</CardTitle>
          </CardHeader>
          <CardContent>{t("text.welcome")}</CardContent>
          <CardFooter className="flex justify-end">
            <CreateTeamButton />
          </CardFooter>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="w-full flex justify-center">
        <Card className="w-[60%] bg-black text-gray-100 border-0">
          <CardHeader>
            <CardTitle className="text-center">{t("title.welcome")}</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    );
  }
}
