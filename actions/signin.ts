"use server";

import { AuthFormSchema } from "@/schemas";
import type { AuthFormType } from '@/schemas';


export const signin = async(formData: AuthFormType) => {
  console.log('SignIn action formData: ', formData);

  let validatedResult = AuthFormSchema.safeParse(formData);
 
  if (!validatedResult.success) {
    return {error: 'Your credentials invalid. Try again.'};
  }

  return {success: 'Your credentials sent'}
}