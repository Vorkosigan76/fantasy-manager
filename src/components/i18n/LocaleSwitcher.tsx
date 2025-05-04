"use client";

import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import LocaleSwitcherSelect from "./LocalSwitcherSelect";
import { SelectGroup, SelectItem } from "@/components/ui/select";
import Image from "next/image";

const flags: { [key: string]: string } = {
  en: "/images/flags/GB.svg",
  fr: "/images/flags/FR.svg",
};

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale}>
      <SelectGroup>
        {routing.locales.map((cur) => (
          <SelectItem key={cur} value={cur}>
            <div className="inline-flex items-center justify-center w-full space-x-2">
              <div className="h-4 w-4 rounded-full overflow-hidden relative ">
                <Image
                  src={flags[cur]}
                  alt={cur}
                  width={24}
                  height={16}
                  className="object-center absolute top-0.5 scale-150"
                />
              </div>
              <p>{t("locale_" + cur)}</p>
            </div>
          </SelectItem>
        ))}
      </SelectGroup>
    </LocaleSwitcherSelect>
  );
}
