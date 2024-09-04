import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db";


export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) { // user is available during sign-in
        token.role = user.role;
        token.id = user.id;
      }
  
      console.log("\x1b[32m", "AUTH JWT Token: ", '\x1b[0m', token);
      return token;
    },
    session({ session, token }) {
      if (!session.user) return session;

      if (token.id && token.role) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      console.log("\x1b[32m", "AUTH Session: ", '\x1b[0m', session);
      return session;
    },
  },
  ...authConfig
});