import LocaleSwitcher from "@/components/i18n/LocaleSwitcher";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-white">
      <div className="py-1 flex justify-between">
        <div className="ml-1">
          <LocaleSwitcher />
        </div>
        <div className="h-8 flex flex-col justify-center">
          <p className="text-right text-xs leading-5 text-gray-500 mr-4">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
