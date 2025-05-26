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
import { createTeamSchema, TCreateTeam } from "@/lib/schemas/private";
import { useTransition } from "react";
import { LoadingButton } from "@/components/common/LoadingButton";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { FaAnglesRight } from "react-icons/fa6";
import { createTeam } from "@/data/teams/team";
import NextButton from "../common/NextButton";

export default function CreateTeamStep1Form() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const t = useTranslations("Private");

  const form = useForm<TCreateTeam>({
    resolver: zodResolver(createTeamSchema),
    mode: "onChange",
    defaultValues: {
      team_short_name: "",
      team_name: "",
    },
  });

  const onSubmit = (values: TCreateTeam) => {
    const validatedFields = createTeamSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "fields_invalid" };
    }

    startTransition(async () => {
      createTeam(values)
        .then((res) => {
          if (res.error) {
            toast.error(t("toasts.errors.team_creation_failed"));
            return;
          }
          toast.success(t("toasts.success.team_creation_successfull"));
          router.push("/private/create-team-step2");
        })
        .catch((err) => {
          console.error(err);
          toast.error(t("toasts.errors.team_creation_failed"));
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
        <FormField
          control={form.control}
          name="team_short_name"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between -mt-6">
                <FormLabel>{t("field.team_short_name")}</FormLabel>
                <FormMessage>
                  {form.formState.errors.team_short_name
                    ? t(String(form.formState.errors.team_short_name.message))
                    : ""}
                </FormMessage>
              </div>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("placeholder.team_short_name")}
                  className="bg-red-100 border-0 text-black"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="team_name"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between -mt-6">
                <FormLabel>{t("field.team_name")}</FormLabel>
                <FormMessage>
                  {form.formState.errors.team_name
                    ? t(String(form.formState.errors.team_name.message))
                    : ""}
                </FormMessage>
              </div>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("placeholder.team_name")}
                  className="bg-red-100 border-0 text-black"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <NextButton isPending={isPending} />
        </div>
      </form>
    </Form>
  );
}
