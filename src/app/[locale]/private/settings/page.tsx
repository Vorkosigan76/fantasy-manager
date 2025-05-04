"use server";

import SettingsForm from "@/components/authentication/SettingsForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAccountsByUserId } from "@/data/authentication/user";
import { User } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

export default async function Settings() {
  const t = await getTranslations("Authentication");

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session!.user as User;

  const accounts = await getAccountsByUserId(user.id);

  return (
    <div className="w-full flex justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center">{t("title.settings")}</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingsForm user={user} accounts={accounts} />
        </CardContent>
      </Card>
    </div>
  );
}
