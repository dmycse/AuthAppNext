'use client';

import { ReactNode } from "react";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-user";
import { FormError } from "./FormError";


type RoleGateProps = {
  children: ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {

  let role = useCurrentRole();
  console.log("RoleGate: ", role);

  if (role !== allowedRole) {
    return <FormError message={`You don't have permission to access this page!`} />
  }

  return (
    <>
      {children}
    </>
  )
}
