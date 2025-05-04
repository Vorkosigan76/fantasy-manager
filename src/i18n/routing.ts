import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { languages, fallbackLng } from "./settings";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: languages,

  // Used when no locale matches
  defaultLocale: fallbackLng,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
