'use server';

import { signOut } from "next-auth/react";


export const signout = async () => {
  // * some server logic if needed
  await signOut();
}