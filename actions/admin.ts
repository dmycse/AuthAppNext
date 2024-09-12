"use server";

import { authRole } from "@/utils/authuser";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  let role = await authRole();

  if (role === UserRole.Admin) {
    return {success: "Allowed Server Action!"};
  }

  return {error: "Forbidden Server Action!"};
}