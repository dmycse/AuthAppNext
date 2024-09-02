"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { SignInFormSchema } from "@/schemas";
import type { SignInFormType } from '@/schemas';

import { DEFAULT_SIGNIN_REDIRECT } from '@/routes';


export const signin = async (formData: SignInFormType) => {
  console.log('\x1b[33m', 'ACTION SignIn: ', '\x1b[0m', formData);

  let validatedResult = SignInFormSchema.safeParse(formData);
 
  if (!validatedResult.success) {
    return {error: 'Your credentials invalid. Try again.'};
  }

  let { email, password } = validatedResult.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_SIGNIN_REDIRECT
    })
  } catch (error) {
      if (error instanceof AuthError) {
          return error.type === "CredentialsSignin" 
                  ? {error: 'Invalid credentials!' }
                  : {error: 'Something went wrong!'}
      }
    throw error;
  }

  return {success: "Your successfuly signin!"};
}