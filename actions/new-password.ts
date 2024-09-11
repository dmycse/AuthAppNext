"use server";

import { NewPasswordFormSchema } from "@/schemas";
import type { NewPasswordFormType } from "@/schemas";

import { getPasswordResetTokenByToken } from "@/utils/passwordreset";
import { getUserByEmail } from "@/utils/user";
import { createPasswordHash } from "@/utils/pass";
import { db } from "@/lib/db";


export const newPassword = async (formData: NewPasswordFormType, token?: string) => {
  console.log("\x1b[33m", 'ACTION NewPassword formData: ', "\x1b[0m", formData);

  if (!token) {
    return {error: 'Missing token!'};
  }

  let validatedResult = NewPasswordFormSchema.safeParse(formData);
  console.log("\x1b[33m", 'ACTION NewPassword validatedResult: ', "\x1b[0m", validatedResult);
  if (!validatedResult.success) {
    return {error: 'Invalid data'};
  }

  let { password } = validatedResult.data;
  
  let existingToken = await getPasswordResetTokenByToken(token);
  console.log("ACTION NewPassword ExistingToken: ", existingToken);
  if (!existingToken) {
    return {error: "Invalid token!"};
  }
  
  let isTokenExpired = new Date(existingToken.expires) < new Date();

  if (isTokenExpired) {
    return {error: "Token has expired!"};
  }

  let existingUser = await getUserByEmail(existingToken.email);
  console.log("ACTION NewPassword ExistingUser: ", existingUser);
  if (!existingUser) {
    return {error: "User does not exist!"};
  }
  
  let hashedPassword = await createPasswordHash(password);

  await db.user.update({
    where: {id: existingUser.id},
    data: {
      password: hashedPassword
    }
  });

  await db.passwordResetToken.delete({
    where: {id: existingToken.id}
  });
  
  return {success: "Password has updated!"};
}