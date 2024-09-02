import type { NextAuthConfig } from "next-auth";
import Credentials from 'next-auth/providers/credentials';
// import GitHub from "next-auth/providers/github";

import { SignInFormSchema } from '@/schemas';

import { mathcUserPassword } from '@/utils/pass';
 
export default { 
  // providers: [GitHub]
  providers: [
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