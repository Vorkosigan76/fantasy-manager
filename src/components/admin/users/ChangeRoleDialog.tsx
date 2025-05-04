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
import { Label } from "@/components/ui/label";
import { DialogState } from "@/types/DialogState";
import { useTranslations } from "next-intl";
import { create } from "zustand";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Table } from "@tanstack/react-table";
import { UserRole } from "@/data/authentication/user-role";
import { User } from "@/generated/prisma";

export const getChangeRoleDialogState = create<DialogState<User>>((set) => ({
  isOpen: false,
  toggleModal: () =>
    set((state: DialogState<User>) => ({ isOpen: !state.isOpen })),
  data: null,
  setData: (data: User) => set(() => ({ data: data })),
}));

export function ChangeRoleDialog(
  props: Pick<DialogState<User>, "isOpen" | "data" | "toggleModal"> & {
    table: Table<User>;
    rowIndex: number;
  }
) {
  const t = useTranslations("Administration");

  const [role, setRole] = useState<UserRole>(props.data?.role as UserRole);

  console.log("ChangeRoleDialog", props.data);
  console.log("ChangeRoleValue", role);

  const handleRoleChange = async () => {
    try {
      await authClient.admin.setRole({
        userId: props.data!.id,
        role: role,
      });
      const updatedUser = props.data! as User;
      updatedUser.role = role;
      props.table.options.meta?.updateData(props.rowIndex, updatedUser);
      props.table.options.meta?.toast_success(
        t("toasts.success.rolechange_successfull")
      );
    } catch (error) {
      props.table.options.meta?.toast_success(
        t("toasts.errors.rolechange_failed"),
        error as string
      );
    }
  };

  function handleRoleSelect(value: string) {
    setRole(value as UserRole);
  }

  return (
    <Dialog open={props.isOpen} onOpenChange={props.toggleModal}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{t("title.change_userrole")}</DialogTitle>
          <DialogDescription>{t("text.change_userrole")}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-1">
              {t("fields.userrole")}
            </Label>
            <div className="col-span-3">
              <RoleSelect
                value={role}
                isPending={false}
                onSelect={handleRoleSelect}
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
                onClick={handleRoleChange}
              >
                {t("actions.change_role")}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface RoleSelectProps {
  value: string;
  onSelect: (value: string) => void;
  isPending: boolean;
}

function RoleSelect({ value, onSelect, isPending }: RoleSelectProps) {
  const t = useTranslations("Administration");

  const roles = Object.values(UserRole) as string[];

  return (
    <Select defaultValue={value} disabled={isPending} onValueChange={onSelect}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role} value={role}>
            {t(`fields.role.${role}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
