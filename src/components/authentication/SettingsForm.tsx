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
import { settingsSchema, TSettings } from "@/lib/schemas/authentication";
import { authClient } from "@/lib/auth-client";
import { useTransition } from "react";
import { LoadingButton } from "@/components/common/LoadingButton";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Account, User } from "@/generated/prisma";
import StatusBadge from "../common/StatusBadge";
import RoleBadge from "../common/RoleBadge";
import GithubIcon from "./GithubIcon";
import GoogleIcon from "./GoogleIcon";
import CredentialIcon from "./CredentialIcon";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa";

export default function SettingsForm({
  user,
  accounts,
}: {
  user: User;
  accounts: Account[];
}) {
  const [isPending, startTransition] = useTransition();

  const t = useTranslations("Authentication");

  const form = useForm<TSettings>({
    resolver: zodResolver(settingsSchema),
    mode: "onChange",
    defaultValues: {
      name: user.name,
    },
  });

  const onSubmit = (values: TSettings) => {
    const validatedFields = settingsSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "fields_invalid" };
    }

    startTransition(async () => {
      await authClient.updateUser(
        {
          name: values.name,
        },
        {
          onRequest: () => {},
          onSuccess: () => {
            toast.success(t("toasts.success.update_profile_successfull"));
          },
          onError: (ctx) => {
            toast.error(t("toasts.errors.update_profile_failed"), {
              description: ctx.error.message,
            });
          },
        },
      );
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-center mt-2">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.image || undefined} />
            <AvatarFallback className="bg-gray-400">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
        </div>
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
                <Input
                  placeholder={t("placeholder.name")}
                  className="bg-red-100 border-0 text-black"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div>
          <div className="flex justify-between -mt-4">
            <Label>{t("field.email")}</Label>
            <p className="text-sm italic">{user.email}</p>
          </div>
        </div>
        <div className="flex justify-between -mt-4">
          <Label>{t("field.verified")}</Label>
          <StatusBadge status={user.emailVerified} />
        </div>
        <div className="flex justify-between -mt-4">
          <Label>{t("field.role")}</Label>
          <RoleBadge role={user.role} />
        </div>
        <div className="flex justify-between -mt-4 ">
          <Label>{t("field.accounts")}</Label>
          <div className="flex items-center space-x-2">
            {accounts.map((account) => {
              return (
                <div key={account.id} className="flex items-center space-x-2">
                  {account.providerId === "credential" && (
                    <CredentialIcon size={24} />
                  )}
                  {account.providerId === "github" && <GithubIcon size={24} />}
                  {account.providerId === "google" && (
                    <GoogleIcon className="h-5 w-5 " />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-end -mt-4">
          <LoadingButton
            pending={isPending}
            className="bg-red-900 hover:bg-red-800"
          >
            {t("button.save")}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
