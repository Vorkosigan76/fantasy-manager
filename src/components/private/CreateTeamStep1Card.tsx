"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import CreateTeamStep1Form from "./CreateTeamStep1Form";

export default function CreateTeamStep1Card() {
  const t = useTranslations("Private");

  return (
    <Card className="w-[40%] bg-black text-gray-100 border-0">
      <CardHeader>
        <CardTitle className="text-center">
          {t("title.create_team_step1")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CreateTeamStep1Form />
      </CardContent>
    </Card>
  );
}
