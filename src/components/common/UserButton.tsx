"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FaCog,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useTranslations } from "next-intl";
import { LogoutButton } from "../authentication/LogoutButton";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export const UserButton = () => {
  const user = useCurrentUser();
  const t = useTranslations("Authentication");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-0">
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback className="bg-red-900">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-40 mt-3 bg-red-900 text-gray-100 border-0"
        align="start"
      >
        {user && user.role === "admin" && (
          <>
            <ButtonItemSkeleton
              icon={<FaUsers className="w-4 h-4 mr-2 text-gray-100" />}
              text={t("button.users")}
              href="/admin/users"
            />
            <DropdownMenuSeparator />
          </>
        )}
        {user && (
          <>
            <ButtonItemSkeleton
              icon={<FaCog className="w-4 h-4 mr-2 text-gray-100" />}
              text={t("button.settings")}
              href="/private/settings"
            />
            <DropdownMenuSeparator />
            <LogoutButton className="justify-start pl-1 bg-red-900 text-gray-100 hover:bg-red-800 focus:text-gray-100">
              <DropdownMenuItem className="focus:bg-transparent focus:text-gray-100 cursor-pointer">
                <FaSignOutAlt className="w-4 h-4 mr-2 text-gray-100" />
                <p className="font-normal text-sm">{t("button.signout")}</p>
              </DropdownMenuItem>
            </LogoutButton>
          </>
        )}
        {!user && (
          <ButtonItemSkeleton
            icon={<FaSignInAlt className="w-4 h-4 mr-0 text-gray-100" />}
            text={t("button.signin")}
            href="/auth/signin"
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ButtonItemSkeleton = ({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
}) => {
  return (
    <Button variant="ghost" asChild className="w-full">
      <Link
        href={href}
        className="justify-start pl-1 bg-red-900 text-gray-100 hover:bg-red-800 focus:text-gray-100"
      >
        <DropdownMenuItem className="focus:bg-transparent focus:text-gray-100 cursor-pointer">
          {icon}
          <p className="font-normal text-sm">{text}</p>
        </DropdownMenuItem>
      </Link>
    </Button>
  );
};