import { useTranslations } from "next-intl";
import { Badge } from "../ui/badge";

interface RoleBadgeProps {
  role: string;
}

export default function RoleBadge({ role }: RoleBadgeProps) {
  const t = useTranslations("Administration");

  return (
    <div className="text-center">
      <Badge
        variant={role === "user" ? "outline" : "secondary"}
        className="w-[75px]"
      >
        {t("fields.role." + role)}
      </Badge>
    </div>
  );
}
