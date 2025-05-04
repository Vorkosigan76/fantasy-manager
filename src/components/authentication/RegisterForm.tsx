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
  registrationSchema,
  TRegistration,
} from "@/lib/schemas/authentication";
import { authClient } from "@/lib/auth-client";
import { useTransition } from "react";
import { LoadingButton } from "@/components/common/LoadingButton";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { getUserByEmail } from "@/data/authentication/user";

interface RegisterFormProps {
  handleSubmit: () => void;
}

export default function RegisterForm({ handleSubmit }: RegisterFormProps) {
  const [isPending, startTransition] = useTransition();

  const t = useTranslations("Authentication");

  const form = useForm<TRegistration>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: TRegistration) => {
    const validatedFields = registrationSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "fields_invalid" };
    }
    const { email } = validatedFields.data;

    startTransition(async () => {
      const existingUser = await getUserByEmail(email);

      if (existingUser) {
        toast.error(t("toasts.errors.registration_failed"), {
          description: t("toasts.errors.email_in_use"),
        });
      } else {
        await authClient.signUp.email(
          {
            email: values.email,
            password: values.password,
            name: values.name,
          },
          {
            onRequest: () => {},
            onSuccess: () => {
              toast.success(t("toasts.success.registration_successfull"));
              handleSubmit();
            },
            onError: (ctx) => {
              toast.error(t("toasts.errors.registration_failed"), {
                description: ctx?.error.message,
              });
            },
          },
        );
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>{t("field.name")}</FormLabel>
                <FormMessage>
                  {form.formState.errors.name
                    ? t(form.formState.errors.name.message!)
                    : ""}
                </FormMessage>
              </div>
              <FormControl>
                <Input placeholder={t("placeholder.name")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between -mt-6">
                <FormLabel>{t("field.email")}</FormLabel>
                <FormMessage>
                  {form.formState.errors.email
                    ? t(form.formState.errors.email.message!)
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
        />
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
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />{" "}
        <div className="flex justify-end">
          <LoadingButton pending={isPending}>
            {t("button.register")}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
