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
  resetPasswordSchema,
  TResetPassword,
} from "@/lib/schemas/authentication";
import { authClient } from "@/lib/auth-client";
import { useTransition } from "react";
import { LoadingButton } from "@/components/common/LoadingButton";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { SIGNIN_ROUTE } from "@/routes";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const t = useTranslations("Authentication");

  const form = useForm<TResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: TResetPassword) => {
    const validatedFields = resetPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "fields_invalid" };
    }
    const { password } = validatedFields.data;

    startTransition(async () => {
      await authClient.resetPassword(
        {
          newPassword: password,
          token: token as string,
        },
        {
          onRequest: () => {},
          onSuccess: () => {
            toast.success(t("toasts.success.reset_password_successfull"));
            router.push(SIGNIN_ROUTE);
          },
          onError: (ctx) => {
            toast.error(t("toasts.errors.reset_password_failed"), {
              description: ctx?.error.message,
            });
          },
        },
      );
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between -mt-6">
                <FormLabel>{t("field.password")}</FormLabel>
                <FormMessage>
                  {form.formState.errors.password
                    ? t(String(form.formState.errors.password.message))
                    : ""}
                </FormMessage>
              </div>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("placeholder.password")}
                  className="bg-red-100 border-0 text-black"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between -mt-6">
                <FormLabel>{t("field.confirmation")}</FormLabel>
                <FormMessage>
                  {form.formState.errors.confirmPassword
                    ? t(String(form.formState.errors.confirmPassword.message))
                    : ""}
                </FormMessage>
              </div>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("placeholder.confirmation")}
                  className="bg-red-100 border-0 text-black"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <LoadingButton
            pending={isPending}
            className="bg-red-900 hover:bg-red-800"
          >
            {t("button.reset_password")}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
