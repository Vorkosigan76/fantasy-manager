"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  forgotPasswordSchema,
  TForgotPassword,
} from "@/lib/schemas/authentication";
import { useTranslations } from "next-intl";
import { LoadingButton } from "@/components/common/LoadingButton";
import { useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();

  const t = useTranslations("Authentication");

  const form = useForm<TForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: TForgotPassword) {
    startTransition(async () => {
      await authClient.forgetPassword(
        {
          email: values.email,
        },
        {
          onSuccess: () => {
            form.reset();
            toast.success(t("toasts.success.reset_password"), {
              description: t("toasts.success.check_email"),
            });
          },
          onError: (ctx) => {
            toast.error(t("toasts.errors.reset_password_failed"), {
              description: ctx?.error.message,
            });
          },
        },
      );
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>{t("field.email")}</FormLabel>
                <FormMessage>
                  {form.formState.errors.email
                    ? t(String(form.formState.errors.email.message))
                    : ""}
                </FormMessage>
              </div>
              <FormControl>
                <Input
                  autoComplete="email"
                  placeholder={t("placeholder.email")}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />{" "}
        <div className="flex justify-center">
          <LoadingButton pending={isPending}>
            {t("button.reset_password")}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
