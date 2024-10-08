import { useSession } from "next-auth/react";

export const useCurrentUser = () => {

  let session = useSession();

  return session.data?.user;
}

export const useCurrentRole = () => {

  let session = useSession();

  return session.data?.user?.role;
}
