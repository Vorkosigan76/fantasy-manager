"use client";

import { useTranslations } from "next-intl";

export default function Unauthorized() {
  const t = useTranslations("Errors");

  return (
    <div>
      <h1 className="text-2xl font-bold">{t("401.title")}</h1>
      <p className="mt-4">{t("401.description")}</p>
    </div>
  );
}
