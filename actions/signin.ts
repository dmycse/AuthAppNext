"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { db } from "@/lib/db";
import { SignInFormSchema } from "@/schemas";
import type { SignInFormType } from '@/schemas';

import { DEFAULT_SIGNIN_REDIRECT } from '@/routes';

import { getUserByEmail } from "@/utils/user";
import { getTwoFactorTokenByEmail } from "@/utils/twofactortoken";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens";
import { sendVerificationEmail, sendTwoFactorTokenByEmail } from "@/lib/mail";
import { getTwoFactorConfirmationByUserId } from "@/utils/twofactorconfirmation";


export const signin = async (formData: SignInFormType) => {
  console.log('\x1b[43m%s\x1b[0m','ACTION SignIn', formData);

  let validatedResult = SignInFormSchema.safeParse(formData);
 
  if (!validatedResult.success) {
    return {error: 'Invalid credentials. Try again.'};
  }

  let { email, password, code } = validatedResult.data;

  let existingUser = await getUserByEmail(email);
  console.log('\x1b[43m%s\x1b[0m','ACTION SignIn', existingUser);
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

  if (existingUser.isTwoFactorEnabled) {
      if (code) {
        let twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
        
        if (!twoFactorToken) {
          return {error: 'Something went wrong!'}
        }

        if (twoFactorToken.token !== code) {
          return {error: 'Invalid code!'}
        }

        let hasExpired = new Date(twoFactorToken.expires) < new Date();

        if (hasExpired) {
          return {error: 'Code has expired!'}
        }

        await db.twoFactorToken.delete({
          where: { id: twoFactorToken.id }
        }).catch(error => console.log("\x1b[41m%s\x1b[0m", 'SIGNIN DB TwoFactorToken Delete Error: ', error));
        // * Posssible to have db.twoFactorConfirmation is redudant
        let existinfTwoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
        
        if (existinfTwoFactorConfirmation) {
          await db.twoFactorConfirmation.delete({
            where: { id: existinfTwoFactorConfirmation.id }
          }).catch(error => console.log("\x1b[41m%s\x1b[0m", 'SIGNIN DB TwoFactorConfirmation Delete Error: ', error));
        }

        await db.twoFactorConfirmation.create({
          data: {
            userId: existingUser.id
          }
        }).catch(error => console.log("\x1b[41m%s\x1b[0m", 'SIGNIN DB TwoFactorConfirmation Create Error: ', error));

      } else {
          let twoFactorToken = await generateTwoFactorToken(existingUser.email);
      
          if (!twoFactorToken) {
            return {error: 'Something went wrong!'}
          }
          
          await sendTwoFactorTokenByEmail(twoFactorToken.email, twoFactorToken.token);
          
          return {twoFactor: true};
      }
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