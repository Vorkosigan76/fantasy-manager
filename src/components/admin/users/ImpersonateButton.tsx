"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ImpersonateButtonProps {
  userId: string;
}

export default function ImpersonateButton({ userId }: ImpersonateButtonProps) {
  const t = useTranslations("Administration");

  const router = useRouter();

  const handleImpersonateUser = async () => {
    try {
      await authClient.admin.impersonateUser({
        userId: userId,
      });
      router.push("/");
      toast.success(t("toasts.success.impersonate_successfull"));
    } catch (error) {
      toast.error(t("toasts.errors.impersonate_failed"), {
        description: String(error),
      });
    }
  };

  return (
    <Button
      size="xs"
      variant="outline"
      className="text-xs"
      onClick={handleImpersonateUser}
    >
      {t("actions.impersonate")}
    </Button>
  );
}
