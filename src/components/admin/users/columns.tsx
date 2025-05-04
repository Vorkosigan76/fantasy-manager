"use client";

import { DataTableColumnHeader } from "@/components/common/table/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import { User } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import ImpersonateButton from "./ImpersonateButton";
import { authClient } from "@/lib/auth-client";
import StatusBadge from "@/components/common/StatusBadge";
import RoleBadge from "@/components/common/RoleBadge";
import { BanUserDialog, getBanUserDialogState } from "./BanUserDialog";
import { getColumnProps } from "@/components/common/table/data-table-types";
import { ChangeRoleDialog, getChangeRoleDialogState } from "./ChangeRoleDialog";

export function getColumns({ t }: getColumnProps): ColumnDef<User>[] {
  const { data: session } = authClient.useSession();

  const {
    isOpen: ban_isopen,
    toggleModal: ban_toggleModal,
    data: ban_data,
    setData: ban_setData,
  } = getBanUserDialogState();

  const {
    isOpen: role_isopen,
    toggleModal: role_toggleModal,
    data: role_data,
    setData: role_setData,
  } = getChangeRoleDialogState();

  return [
    {
      id: "name",
      accessorFn: (user) => {
        return user.name;
      },
      header: ({ column }) => {
        return (
          <DataTableColumnHeader column={column} title={t("columns.name")} />
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">{row.getValue("name")}</div>
        );
      },
    },
    {
      id: "email",
      accessorFn: (user) => {
        return user.email;
      },
      header: ({ column }) => {
        return (
          <DataTableColumnHeader column={column} title={t("columns.email")} />
        );
      },
      cell: ({ row }) => {
        return <div className="text-left">{row.getValue("email")}</div>;
      },
    },
    {
      id: "role",
      accessorFn: (user) => {
        return user.role;
      },
      header: ({ column }) => {
        return (
          <DataTableColumnHeader column={column} title={t("columns.role")} />
        );
      },
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        return <RoleBadge role={role} />;
      },
    },
    {
      id: "status",
      accessorFn: (user) => {
        return user.emailVerified;
      },
      header: ({ column }) => {
        return (
          <DataTableColumnHeader column={column} title={t("columns.status")} />
        );
      },
      cell: ({ row }) => {
        const status = row.getValue("status") as boolean;
        return <StatusBadge status={status} />;
      },
    },
    {
      id: "joined",
      accessorFn: (user) => {
        return new Date(user.createdAt).toLocaleDateString("en-GB");
      },
      header: ({ column }) => {
        return (
          <DataTableColumnHeader column={column} title={t("columns.joined")} />
        );
      },
      cell: ({ row }) => {
        return <div className="text-left">{row.getValue("joined")}</div>;
      },
    },

    {
      accessorKey: "actions",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader column={column} title={t("columns.actions")} />
        );
      },
      cell: (row) => {
        const id = row.row.original.id;
        const user_id = session?.user.id;
        const isBanned = row.row.original.banned;

        return (
          <div className="flex justify-end space-x-2">
            {user_id && user_id !== id && (
              <>
                {isBanned && (
                  <Button
                    size={"xs"}
                    className="w-[75px] text-xs"
                    variant="default"
                    onClick={async () => {
                      try {
                        await authClient.admin.unbanUser({
                          userId: id,
                        });
                        const updatedUser = row.row.original as User;
                        updatedUser.banned = false;
                        row.table.options.meta?.updateData(
                          row.row.index,
                          updatedUser
                        );
                        row.table.options.meta?.toast_success(
                          t("toasts.success.unban_successfull")
                        );
                      } catch (error) {
                        row.table.options.meta?.toast_success(
                          t("toasts.errors.unban_failed"),
                          error as string
                        );
                      }
                    }}
                  >
                    {t("actions.unban")}
                  </Button>
                )}
                {!isBanned && (
                  <Button
                    size={"xs"}
                    className="w-[75px] text-xs"
                    variant="destructive"
                    onClick={() => {
                      ban_setData(row.row.original);
                      ban_toggleModal();
                    }}
                  >
                    {t("actions.ban")}
                  </Button>
                )}
                <Button
                  size={"xs"}
                  className="w-[75px] text-xs"
                  variant="default"
                  onClick={() => {
                    role_setData(row.row.original);
                    role_toggleModal();
                  }}
                >
                  {t("actions.change_role")}
                </Button>
                <ImpersonateButton userId={id} />
                <BanUserDialog
                  isOpen={ban_isopen}
                  toggleModal={ban_toggleModal}
                  data={ban_data}
                  rowIndex={row.row.index}
                  table={row.table}
                ></BanUserDialog>
                <ChangeRoleDialog
                  isOpen={role_isopen}
                  toggleModal={role_toggleModal}
                  data={role_data}
                  rowIndex={row.row.index}
                  table={row.table}
                ></ChangeRoleDialog>
              </>
            )}
          </div>
        );
      },
      enableSorting: false,
      size: 100,
    },
  ];
}
