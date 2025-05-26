"use client";

import { LoadingButton } from "@/components/common/LoadingButton";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface LogoutButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export const LogoutButton = ({ children, className }: LogoutButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = async () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/auth/signin");
            router.refresh();
          },
        },
      });
    });
  };

  return (
    <LoadingButton
      className={className}
      pending={isPending}
      onClick={handleSignOut}
      variant="ghost"
    >
      {children}
    </LoadingButton>
  );
};
