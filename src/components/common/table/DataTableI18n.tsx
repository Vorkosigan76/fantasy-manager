"use client";

import {
  ColumnFiltersState,
  RowData,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DataTablePagination } from "@/components/common/table/DataTablePagination";
import { useLocale, useTranslations } from "next-intl";
import { DataTableI18nProps } from "./data-table-types";
import { toast } from "sonner";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    deleteData: (rowIndex: number) => void;
    updateData: (rowIndex: number, value: TData) => void;
    toast_success: (title: string, message?: string) => void;
    toast_error: (title: string, message?: string) => void;
  }
}

export function DataTableI18n<TData, TValue>({
  i18nNamespace,
  getColumns,
  initialData,
  initialSorting,
}: DataTableI18nProps<TData, TValue>) {
  const [data, setData] = useState(initialData);
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const locale = useLocale();
  const t = useTranslations("Table");
  const t2 = useTranslations(i18nNamespace);

  function translate(text: string) {
    return t2(text);
  }

  const columns = getColumns({ t: translate, locale });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    meta: {
      deleteData: (rowIndex) => {
        const filtered = (old: TData[]) =>
          old.filter((row, index) => index !== rowIndex);
        setData(filtered);
      },
      updateData: (rowIndex, value) => {
        setData((old) =>
          old.map((row, index) => (index === rowIndex ? value : row))
        );
      },
      toast_success: (title, message = undefined) => {
        if (message === undefined) {
          toast.success(title);
        } else {
          toast.success(title, {
            description: message,
          });
        }
      },
      toast_error: (title, message = undefined) => {
        if (message === undefined) {
          toast.error(title);
        } else {
          toast.error(title, {
            description: message,
          });
        }
      },
    },
  });

  return (
    <div className="mx-2">
      <div className="flex items-center py-4">
        <p className="mr-2 text-sm">{t("search_label")}</p>
        <Input
          placeholder={t("search_placeholder")}
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="w-48 h-8 mb-1"
        />
      </div>
      <div className="rounded-md border mb-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={"even:bg-white hover:bg-slate-200"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t("no_data")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
