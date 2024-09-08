import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db";
import { getUserById } from "./utils/user";


export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
    error: "auth/error"
  },
  events: {
    // * Fill in emailVerification field for users signed in via Google or GitHub
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date()} 
      }).catch(error => console.log("\x1b[31m", 'Auth LinkAccount DB Update Error: ', error, "\x1b[0m"));
    }
  },
  callbacks: {
    async signIn({user, account}) {
      console.log('SignIn Callback: ', {'User': user, 'Account': account});

      // * Allow OAuth signIn without email verification
      if (account?.provider !== "credentials") return true;
      
      let existingUser = await getUserById(user.id as string);
    
      // * Prevent sign in without email verification
      if (!existingUser?.emailVerified) {
        console.log("\x1b[31m", "Email isn't Confirmed!!!", "\x1b[0m");
        return false;
      }
      
      // Todo: Add 2FA check
 
      return true;
    },
    async jwt({ token, user }) {
      if (user) { // user is available during sign-in
        token.role = user.role;
        token.id = user.id;
      }
  
      console.log("\x1b[32m", "AUTH JWT Token: ", '\x1b[0m', token);
      return token;
    },
    async session({ session, token }) {
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