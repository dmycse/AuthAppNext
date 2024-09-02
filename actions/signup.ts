"use server";

import { SignUpFormSchema } from "@/schemas";
import type { SignUpFormType } from '@/schemas';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/utils/user';
import { createPasswordHash } from "@/utils/pass";


export const signup = async (formData: SignUpFormType) => {
  console.log("\x1b[33m", 'ACTION SignUp formData: ', "\x1b[0m", formData);

  let validatedResult = SignUpFormSchema.safeParse(formData);
  console.log("\x1b[33m", 'ACTION SignUp validatedResult: ', "\x1b[0m", validatedResult);
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
      email: email.toLowerCase(),
      password: hashedPassword 
    },
  });

  return {success: "Account's been created!"};
}