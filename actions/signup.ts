"use server";

import { AuthFormSchema } from "@/schemas";
import type { AuthFormType } from '@/schemas';


export const signup = async(formData: AuthFormType) => {
  console.log('SignUp action formData: ', formData);

  let validatedResult = AuthFormSchema.safeParse(formData);
 
  if (!validatedResult.success) {
    return {error: 'Your credentials invalid. Try again.'};
  }

  return {success: 'Your credentials sent!'};
}