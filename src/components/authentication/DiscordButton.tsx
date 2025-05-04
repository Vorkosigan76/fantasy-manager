"use client";

import { authClient } from "@/lib/auth-client";
import { LoadingButton } from "@/components/common/LoadingButton";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useTranslations } from "next-intl";
import { FaDiscord } from "react-icons/fa";

export default function DiscordButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations("Authentication");

  const handleSignIn = async () => {
    startTransition(async () => {
      await authClient.signIn.social(
        {
          provider: "discord",
        },
        {
          onRequest: () => {},
          onSuccess: async () => {
            toast.success(t("toasts.success.signin_successfull"));
            router.push(DEFAULT_LOGIN_REDIRECT);
          },
          onError: (ctx) => {
            toast.error(t("toasts.errors.registration_failed"), {
              description: ctx?.error.message,
            });
          },
        },
      );
    });
  };

  return (
    <LoadingButton
      pending={isPending}
      className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
      onClick={() => {
        handleSignIn();
      }}
    >
      <FaDiscord color="#5865F2" size={24} />
      <span className="text-sm/6 font-semibold">Discord</span>
    </LoadingButton>
  );
}
