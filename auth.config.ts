import type { NextAuthConfig } from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { SignInFormSchema } from '@/schemas';

import { mathcUserPassword } from '@/utils/pass';
 
export default { 
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
    async authorize(credentials) {
      let isAuthData = SignInFormSchema.safeParse(credentials);
      
      if (isAuthData.success) {
        return await mathcUserPassword(isAuthData.data);
      }

      return null;
    },
   }) 
  ] 
} satisfies NextAuthConfig;