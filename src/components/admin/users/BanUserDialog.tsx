import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  user_ban_durations,
  user_ban_reasons,
} from "@/data/authentication/ban";
import { Label } from "@/components/ui/label";
import { User } from "@/generated/prisma";
import { DialogState } from "@/types/DialogState";
import { useTranslations } from "next-intl";
import { create } from "zustand";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Table } from "@tanstack/react-table";

export const getBanUserDialogState = create<DialogState<User>>((set) => ({
  isOpen: false,
  toggleModal: () =>
    set((state: DialogState<User>) => ({ isOpen: !state.isOpen })),
  data: null,
  setData: (data: User) => set(() => ({ data: data })),
}));

export function BanUserDialog(
  props: Pick<DialogState<User>, "isOpen" | "data" | "toggleModal"> & {
    table: Table<User>;
    rowIndex: number;
  }
) {
  const t = useTranslations("Administration");

  const [reason, setReason] = useState("default");
  const [duration, setDuration] = useState("default");

  let banDuration;
  if (duration === "one_day") {
    banDuration = 60 * 60 * 24;
  } else if (duration === "one_week") {
    banDuration = 60 * 60 * 24 * 7;
  } else if (duration === "one_month") {
    banDuration = 60 * 60 * 24 * 30;
  } else {
    banDuration = 0;
  }

  const handleBan = async () => {
    try {
      await authClient.admin.banUser({
        userId: props.data!.id,
        banReason: reason,
        banExpiresIn: banDuration, //60 * 60 * 24 * 7, // Optional (if not provided, the ban will never expire)
      });
      const updatedUser = props.data! as User;
      updatedUser.banned = true;
      props.table.options.meta?.updateData(props.rowIndex, updatedUser);
      props.table.options.meta?.toast_success(
        t("toasts.success.unban_successfull")
      );
    } catch (error) {
      props.table.options.meta?.toast_success(
        t("toasts.errors.unban_failed"),
        error as string
      );
    }
  };

  function handleReasonSelect(value: string) {
    setReason(value);
  }
  function handleDurationSelect(value: string) {
    setDuration(value);
  }

  return (
    <Dialog open={props.isOpen} onOpenChange={props.toggleModal}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{t("title.ban_user")}</DialogTitle>
          <DialogDescription>{t("text.ban_user")}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-1">
              {t("fields.ban.reason")}
            </Label>
            <div className="col-span-3">
              <BanUserReasonSelect
                isPending={false}
                onSelect={handleReasonSelect}
              />
            </div>
            <Label htmlFor="name" className="text-right col-span-1">
              {t("fields.ban.duration")}
            </Label>
            <div className="col-span-3">
              <BanUserDurationSelect
                isPending={false}
                onSelect={handleDurationSelect}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogFooter className="sm:space-x-2 mt-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="w-[75px]">
                {t("actions.cancel")}
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant={"destructive"}
                className="w-[75px]"
                onClick={handleBan}
              >
                {t("actions.ban")}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface BanUserDurationSelectProps {
  onSelect: (value: string) => void;
  isPending: boolean;
}

function BanUserDurationSelect({
  onSelect,
  isPending,
}: BanUserDurationSelectProps) {
  const t = useTranslations("Administration");

  return (
    <Select
      defaultValue={"default"}
      disabled={isPending}
      onValueChange={onSelect}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {user_ban_durations.map((duration) => (
          <SelectItem key={duration} value={duration}>
            {t(`text.ban_duration.${duration}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface BanUserReasonSelectProps {
  onSelect: (value: string) => void;
  isPending: boolean;
}

function BanUserReasonSelect({
  onSelect,
  isPending,
}: BanUserReasonSelectProps) {
  const t = useTranslations("Administration");

  return (
    <Select
      defaultValue={"default"}
      disabled={isPending}
      onValueChange={onSelect}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {user_ban_reasons.map((reason) => (
          <SelectItem key={reason} value={reason}>
            {t(`text.ban_reason.${reason}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
