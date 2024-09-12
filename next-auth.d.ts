import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";


declare module "next-auth" {
  export interface User {
    role: UserRole,
    isTwoFactorEnabled: boolean,
  }
  
  export interface Session {
      user: User & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string
        role: UserRole
    }
}
