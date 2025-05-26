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
import { authSchema, TAuth } from "@/lib/schemas/authentication";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { LoadingButton } from "@/components/common/LoadingButton";
import { toast } from "sonner";
import { getUserByEmail } from "@/data/authentication/user";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const t = useTranslations("Authentication");

  const form = useForm<TAuth>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: TAuth) {
    const validatedFields = authSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "fields_invalid" };
    }

    const { email } = validatedFields.data;

    startTransition(async () => {
      const existingUser = await getUserByEmail(email);

      if (!existingUser) {
        toast.error(t("toasts.errors.email_unknown"));
      } else if (existingUser?.emailVerified === false) {
        toast.error(t("toasts.errors.email_not_verified"), {
          description: t("toasts.errors.please_verify_email"),
        });
        authClient.sendVerificationEmail({ email });
      } else {
        await authClient.signIn.email(
          {
            email: values.email,
            password: values.password,
          },
          {
            onRequest: () => {},
            onSuccess: () => {
              toast.success(t("toasts.success.signin_successfull"));
              router.push(DEFAULT_LOGIN_REDIRECT);
            },
            onError: () => {
              toast.error(t("toasts.errors.signin_failed"), {
                description: t("toasts.errors.invalid_credentials"),
              });
            },
          },
        );
      }
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
                  className="bg-red-100 border-0 text-black"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
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
              <div className="flex justify-end">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-red-800 italic hover:underline"
                >
                  {t("link.forgot")}
                </Link>
              </div>
            </FormItem>
          )}
        />{" "}
        <div className="flex justify-center">
          <LoadingButton
            pending={isPending}
            className="bg-red-900 hover:bg-red-800"
          >
            {t("button.signin")}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
