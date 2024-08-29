"use server";

import { AuthFormSchema } from "@/schemas";
import type { AuthFormType } from '@/schemas';


export const signin = async(values: AuthFormType) => {
  console.log('SignIn action values: ', values);

  let validatedResult = AuthFormSchema.safeParse(values);
 
  if (!validatedResult.success) {
    return {error: 'Your credentials invalid. Try again.'};
  }

  return {success: 'Your credentials sent'}
}