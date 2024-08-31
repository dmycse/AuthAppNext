"use server";

import { SignInFormSchema } from "@/schemas";
import type { SignInFormType } from '@/schemas';


export const signin = async(formData: SignInFormType) => {
  console.log('\x1b[33m', 'ACTION SignIn: ', '\x1b[0m', formData);

  let validatedResult = SignInFormSchema.safeParse(formData);
 
  if (!validatedResult.success) {
    return {error: 'Your credentials invalid. Try again.'};
  }

  return {success: 'Your credentials sent'}
}