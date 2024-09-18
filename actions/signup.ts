"use server";

import { SignUpFormSchema } from "@/schemas";
import type { SignUpFormType } from '@/schemas';

import { db } from '@/lib/db';
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

import { getUserByEmail } from '@/utils/user';
import { createPasswordHash } from "@/utils/pass";


export const signup = async (formData: SignUpFormType) => {
  // console.log("\x1b[33m", 'ACTION SignUp formData: ', "\x1b[0m", formData);

  let validatedResult = SignUpFormSchema.safeParse(formData);
  // console.log("\x1b[33m", 'ACTION SignUp validatedResult: ', "\x1b[0m", validatedResult);
  if (!validatedResult.success) {
    return {error: 'Your credentials invalid. Try again.'};
  }

  let {name, email, password} = validatedResult.data;

  let emailExists = await getUserByEmail(email);
  
  if (emailExists) {
    return {error: 'Email is already taken!'};
  }

  let hashedPassword = await createPasswordHash(password);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword 
    },
  }).catch(error => console.log("\x1b[31m", 'DB User Create Error: ', "\x1b[0m", error));

  let verificationToken = await generateVerificationToken(email);

  if (verificationToken) {
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return {success: "Confirmation sent to your email box!"};
  }

 return {error: 'Something went wrong!'};
}