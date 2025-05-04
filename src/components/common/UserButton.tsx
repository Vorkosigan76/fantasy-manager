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
        <Avatar>
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback className="bg-gray-400">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 -mt-2" align="start">
        {user && user.role === "admin" && (
          <>
            <DropdownMenuItem className="py-0">
              <Button variant="ghost" asChild className="w-full" size={"xs"}>
                <Link href="/admin/users" className="justify-start pl-0">
                  <FaUsers className="w-4 h-4 mr-2 " />
                  <p className="font-normal text-sm">{t("button.users")}</p>
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        {user && (
          <>
            <DropdownMenuItem className="py-0">
              <Button variant="ghost" asChild className="w-full" size={"xs"}>
                <Link href="/private/settings" className="justify-start pl-0">
                  <FaCog className="w-4 h-4 mr-2 " />
                  <p className="font-normal text-sm">{t("button.settings")}</p>
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="py-0">
              <LogoutButton className="justify-start pl-0">
                <FaSignOutAlt className="w-4 h-4 mr-2" />
                <p className="font-normal text-sm">{t("button.signout")}</p>
              </LogoutButton>
            </DropdownMenuItem>
          </>
        )}
        {!user && (
          <Button variant="ghost" asChild className="w-full">
            <Link href="/auth/signin" className="justify-start pl-1">
              <DropdownMenuItem>
                <FaSignInAlt className="w-4 h-4 mr-0" />
                <p className="font-normal text-sm">{t("button.signin")}</p>
              </DropdownMenuItem>
            </Link>
          </Button>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
