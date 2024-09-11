import { auth } from "@/auth";

export const authUser = async () => {
  let session = await auth();
  
  return session?.user;
}