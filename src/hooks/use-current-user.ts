import { authClient } from "@/lib/auth-client"; // import the auth client

export const useCurrentUser = () => {
  const { data: session } = authClient.useSession();

  return session?.user;
};
