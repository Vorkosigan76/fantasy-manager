"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "./RegisterForm";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SocialButtons } from "./SocialButtons";

export default function RegisterCard() {
  const [isSubmitted, setSubmitted] = useState(false);

  const t = useTranslations("Authentication");

  function handleSubmit() {
    setSubmitted(true);
  }

  return (
    <>
      {!isSubmitted && (
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-center">{t("title.register")}</CardTitle>
          </CardHeader>
          <CardContent>
            <RegisterForm handleSubmit={handleSubmit} />
            <p className="text-center text-sm mt-2">
              {t("text.already-account")}{" "}
              <Link
                href="/auth/signin"
                className="text-sm text-blue-500 italic hover:underline"
              >
                {t("link.signin")}
              </Link>
            </p>
            <SocialButtons />
          </CardContent>
        </Card>
      )}
      {isSubmitted && (
        <div className="w-full flex justify-center">
          {t("messages.success.registration_successfull")}
        </div>
      )}
    </>
  );
}
