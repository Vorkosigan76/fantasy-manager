"use client";
import {
  TbCaretUpDownFilled,
  TbCaretUpFilled,
  TbCaretDownFilled,
} from "react-icons/tb";

import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <Button
        variant="ghost"
        size="lg"
        className="-ml-3 h-8 w-full hover:text-current"
      >
        <span className="">{title}</span>
      </Button>
    );
  }

  return (
    <div className={cn("flex items-center space-x-2 ", className)}>
      <Button
        variant="ghost"
        size="lg"
        className="-ml-3 h-8 data-[state=open]:bg-accent w-full"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="">{title}</span>
        {column.getIsSorted() === "desc" ? (
          <TbCaretDownFilled className="ml-auto h-4 w-4" />
        ) : column.getIsSorted() === "asc" ? (
          <TbCaretUpFilled className="ml-auto h-4 w-4" />
        ) : (
          <TbCaretUpDownFilled className="ml-auto h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
