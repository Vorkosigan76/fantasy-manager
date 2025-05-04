import { DataTableI18n } from "@/components/common/table/DataTableI18n";
import { SortingState } from "@tanstack/react-table";
import { getColumns } from "@/components/admin/users/columns";
import { listUsers } from "@/data/authentication/user";

export default async function UsersDataTable() {
  const data = await listUsers();

  const initialSorting: SortingState = [
    {
      id: "name",
      desc: false,
    },
  ];

  return (
    <DataTableI18n
      i18nNamespace="Administration"
      getColumns={getColumns}
      initialData={data}
      initialSorting={initialSorting}
    />
  );
}
