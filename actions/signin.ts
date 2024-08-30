"use server";

import { SignInFormSchema } from "@/schemas";
import type { SignInFormType } from '@/schemas';


export const signin = async(formData: SignInFormType) => {
  console.log('ACTION SignIn: ', formData);

  let validatedResult = SignInFormSchema.safeParse(formData);
 
  if (!validatedResult.success) {
    return {error: 'Your credentials invalid. Try again.'};
  }

  return {success: 'Your credentials sent'}
}