"use server";

import { AuthFormSchema } from "@/schemas";
import type { AuthFormType } from '@/schemas';


export const signup = async(values: AuthFormType) => {
  console.log('SignUp action values: ', values);

  let validatedResult = AuthFormSchema.safeParse(values);
 
  if (!validatedResult.success) {
    return {error: 'Your credentials invalid. Try again.'};
  }

  return {success: 'Your credentials sent!'};
}