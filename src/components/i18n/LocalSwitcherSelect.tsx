"use client";

import { ReactNode, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectProps = {
  children: ReactNode;
  defaultValue: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
}: SelectProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(value: string) {
    const nextLocale = value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <Select
      defaultValue={defaultValue}
      disabled={isPending}
      onValueChange={onSelectChange}
    >
      <SelectTrigger className="w-[180px] h-8 focus:ring-0 bg-red-900 text-gray-100 border-0 border-shadow-none focus:border-0 focus:ring-none focus:ring-offset-0 hover:cursor-pointer">
        <SelectValue aria-label={defaultValue}></SelectValue>
      </SelectTrigger>
      <SelectContent className="-ml-1 bg-red-900 text-gray-100 border-0 mb-1">
        {children}
      </SelectContent>
    </Select>
  );
}
