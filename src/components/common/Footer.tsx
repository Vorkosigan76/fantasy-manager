import LocaleSwitcher from "@/components/i18n/LocaleSwitcher";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="text-gray-100 bg-red-900">
      <div className="py-1 flex justify-between">
        <div className="ml-1">
          <LocaleSwitcher />
        </div>
        <div className="h-8 flex flex-col justify-center">
          <p className="text-right text-xs leading-5 mr-4">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
