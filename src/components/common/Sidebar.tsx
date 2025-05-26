"use client";

import clsx from "clsx";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import {
  FaAnglesRight,
  FaAnglesLeft,
  FaHouse,
  FaUsers,
  FaCalendarDays,
} from "react-icons/fa6";
import { Link } from "@/i18n/routing";
import { Team } from "@/generated/prisma";

type SidebarProps = {
  team?: Team;
};

export default function Sidebar({ team }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const t = useTranslations("Menu");

  return (
    <div
      className={clsx("bg-black text-gray-100 flex flex-col pl-3 pt-2", {
        "w-[150px]": isSidebarOpen,
        "w-[65px]": !isSidebarOpen,
      })}
    >
      <div>
        <Button
          className="text-gray-100 mb-4 bg-transparent hover:bg-gray-900 rounded-full px-3 hover:cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <FaAnglesLeft className="text-lg" />
          ) : (
            <FaAnglesRight className="text-lg" />
          )}
        </Button>
      </div>

      <div className="flex flex-col gap-1 mt-4">
        {menuItem(
          "home",
          <FaHouse className="text-lg" />,
          t("items.home"),
          isSidebarOpen
        )}
        {team &&
          menuItem(
            "team",
            <FaUsers className="text-lg" />,
            t("items.team"),
            isSidebarOpen
          )}
        {team &&
          menuItem(
            "calendar",
            <FaCalendarDays className="text-lg" />,
            t("items.calendar"),
            isSidebarOpen
          )}
      </div>
    </div>
  );
}

function menuItem(
  key: string,
  icon: React.ReactNode,
  label: string,
  isSidebarOpen: boolean
) {
  return (
    <Button
      key={key}
      className={clsx(
        "text-gray-100 bg-transparent hover:bg-gray-900 rounded-lg mr-3 px-3",
        { "justify-start": isSidebarOpen }
      )}
      asChild
    >
      <Link href="/" key={key}>
        {icon}
        {isSidebarOpen && <span className="ml-2 mt-1">{label}</span>}
      </Link>
    </Button>
  );
}
