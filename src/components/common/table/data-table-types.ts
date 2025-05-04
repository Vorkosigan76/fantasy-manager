import { ColumnDef, SortingState } from "@tanstack/react-table";

export type DataTableI18nProps<TData, TValue> = {
  i18nNamespace: string;
  getColumns: ({ t, locale }: getColumnProps) => ColumnDef<TData, TValue>[];
  initialData: TData[];
  initialSorting: SortingState;
};

export interface getColumnProps {
  t: (text: string) => string;
  locale?: string;
}
