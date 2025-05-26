"server-only";

import { Link } from "@/i18n/routing";
import { UserButton } from "./UserButton";
import { getTranslations } from "next-intl/server";

export default async function Navbar() {
  const t = await getTranslations("Metadata");

  return (
    <nav className="flex justify-between items-center py-3 px-4 z-50 bg-red-900 text-gray-100">
      <Link href="/" className="text-xl font-bold">
        {t("title")}
      </Link>
      <UserButton />
    </nav>
  );
}
