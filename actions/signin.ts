"use server";

import { SignUpFormSchema } from "@/schemas";
import type { SignUpFormType } from '@/schemas';


export const signup = async(values: SignUpFormType) => {
  console.log('SignIn action values: ', values);

  let validatedResult = SignUpFormSchema.safeParse(values);
 
  if (!validatedResult.success) {
    return {error: 'Your credentials invalid. Try again.'};
  }

  return {success: 'Your credentials sent'}
}