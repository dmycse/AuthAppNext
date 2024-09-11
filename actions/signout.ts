'use server';

import { signOut } from "@/auth";


export const signout = async () => {
  // * some server logic if needed
  await signOut({ redirectTo: '/auth/signin' });
}