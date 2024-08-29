"use server";

import { AuthFormSchema } from "@/schemas";
import type { AuthFormType } from '@/schemas';

import { db } from '@/lib/db';
import { getUserByEmail } from '../utils/user';

import bcrypt from 'bcrypt';
let saltRounds = 10;


export const signup = async (formData: AuthFormType) => {
  console.log('SignUp action formData: ', formData);

  let validatedResult = AuthFormSchema.safeParse(formData);
 
  if (!validatedResult.success) {
    return {error: 'Your credentials invalid. Try again.'};
  }
  console.log('validatedResult', validatedResult);

  let {name, email, password} = validatedResult.data;

  let emailExists = await getUserByEmail(email);
  
  if (emailExists) {
    return {error: 'Email is already taken!'};
  }

  let hashedPassword = await bcrypt.hash(password, saltRounds);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword 
    },
  });

  return {success: 'User created!'};
}