"use server";

import { SignInFormSchema } from "@/schemas";
import type { SignInFormType } from '@/schemas';


export const signup = async(values: SignInFormType) => {
  console.log('SignUp action values: ', values);

  let validatedResult = SignInFormSchema.safeParse(values);
 
  if (!validatedResult.success) {
    return {error: 'Your credentials invalid. Try again.'};
  }

  return {success: 'Your credentials sent!'}
}