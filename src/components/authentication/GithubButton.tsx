"use client";

import { authClient } from "@/lib/auth-client";
import { LoadingButton } from "@/components/common/LoadingButton";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useTranslations } from "next-intl";
import GithubIcon from "./GithubIcon";

export default function GithubButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations("Authentication");

  const handleSignIn = async () => {
    startTransition(async () => {
      await authClient.signIn.social(
        {
          provider: "github",
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
      className="flex w-full items-center justify-center gap-3 rounded-md bg-red-900 hover:bg-red-800 px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm ring-inset focus-visible:ring-transparent"
      onClick={() => {
        handleSignIn();
      }}
    >
      <GithubIcon size={24} />
      <span className="text-sm/6 font-semibold">GitHub</span>
    </LoadingButton>
  );
}
