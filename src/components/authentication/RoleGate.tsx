"use server";

import { UserRole } from "@/data/authentication/user-role";
import Unauthorized from "../errors/Unauthorized";
import { getCurrentRole } from "@/lib/auth";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = async ({ children, allowedRole }: RoleGateProps) => {
  const role = await getCurrentRole();

  // If no role, or role insufficient, redirect to home
  if (!role || (allowedRole === UserRole.ADMIN && role !== UserRole.ADMIN)) {
    return <Unauthorized />;
  }

  return <>{children}</>;
};
