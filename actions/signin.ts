"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { SignInFormSchema } from "@/schemas";
import type { SignInFormType } from '@/schemas';

import { DEFAULT_SIGNIN_REDIRECT } from '@/routes';

import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { getUserByEmail } from "@/utils/user";


export const signin = async (formData: SignInFormType) => {
  console.log('\x1b[33m','ACTION SignIn: ','\x1b[0m', formData);

  let validatedResult = SignInFormSchema.safeParse(formData);
 
  if (!validatedResult.success) {
    return {error: 'Invalid credentials. Try again.'};
  }

  let { email, password } = validatedResult.data;

  let existingUser = await getUserByEmail(email);
  console.log("SIGNIN ExistingUser", existingUser);
  if (!existingUser?.email || !existingUser.password) {
    return {error: "User does not exists!"};
  }

  if (!existingUser.emailVerified) {
    let verificationToken = await generateVerificationToken(existingUser.email);

    if (verificationToken) {
      await sendVerificationEmail(verificationToken.email, verificationToken.token);
      return {error: "Confirm email. Check your email box!"};
    }


    return {error: 'Something went wrong!'}
  }

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