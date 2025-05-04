import clsx from "clsx";
import { useTranslations } from "next-intl";

interface StatusBadgeProps {
  status: boolean;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const t = useTranslations("Administration");

  return (
    <div
      className={clsx("text-center font-medium text-sm", {
        "text-red-500": !status,
        "text-green-500": status,
      })}
    >
      {status ? t("fields.status.is_active") : t("fields.status.is_inactive")}
    </div>
  );
}
