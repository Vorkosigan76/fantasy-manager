"server-only";

import UsersDataTable from "@/components/admin/users/UsersDataTable";
import { RoleGate } from "@/components/authentication/RoleGate";
import { UserRole } from "@/data/authentication/user-role";
import { getTranslations } from "next-intl/server";

export default async function AdminUsers() {
  const t = await getTranslations("Administration");

  return (
    <div className="flex flex-col w-full text-center h-full">
      <RoleGate allowedRole={UserRole.ADMIN}>
        <h1 className="font-medium text-lg mt-30">{t("title.users")}</h1>
        <div className="container mx-auto py-4 align-top h-full ">
          <UsersDataTable />
        </div>
      </RoleGate>
    </div>
  );
}
