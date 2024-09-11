import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";


declare module "next-auth" {
  export interface User {
    role: 'Admin' | 'User',
    isTwoFactorEnabled: boolean,
  }
  
  export interface Session {
      user: User & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string
        role: 'Admin' | 'User'
    }
}
