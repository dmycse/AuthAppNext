import { auth } from "@/auth";

export const authUser = async () => {
  let session = await auth();
  
  return session?.user;
}

export const authRole = async () => {
  let session = await auth();
  
  return session?.user?.role;
}