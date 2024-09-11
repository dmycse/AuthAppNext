import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db";
import { getUserById } from "@/utils/user";
import { getTwoFactorConfirmationByUserId } from "@/utils/twofactorconfirmation";


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
      console.log("\x1b[34m%s\x1b[0m", 'AUTH SignIn Callback: ', {'User': user, 'Account': account});

      // * Allow OAuth (Google or GitHub) signIn without email verification
      if (account?.provider !== "credentials") return true;
      
      let existingUser = await getUserById(user.id as string);
    
      // * Prevent sign in without email verification
      if (!existingUser?.emailVerified) {
        console.log("\x1b[41m%s\x1b[0m", "Email isn't Confirmed!!!");
        return false;
      }
      
      // * Prevent sign in without 2FA confirmation
      if(existingUser.isTwoFactorEnabled) {
        let twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
        
        if (!twoFactorConfirmation) {
          console.log("\x1b[41m%s\x1b[0m", "Two Factor Authentication is not confirmed!!!");
          return false;
        }

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        }).catch(error => console.log("\x1b[41m%s\x1b[0m", 'AUTH SignIn DB TwoFactorConfirmation Delete Error: ', error));
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) { // user is available during sign-in
        token.role = user.role;
        token.id = user.id;
      }
  
      console.log("\x1b[44m%s\x1b[0m", "AUTH JWT Token: ", token);
      return token;
    },
    async session({ session, token }) {
      if (!session.user) return session;
      
      if (token.id && token.role) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      console.log("\x1b[44m%s\x1b[0m", "AUTH Session: ", session);
      return session;
    },
  },
  ...authConfig
});