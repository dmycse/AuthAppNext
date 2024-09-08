"use server";

import { ResetFormSchema } from "@/schemas";
import type { ResetFormType } from "@/schemas";

import { getUserByEmail } from "@/utils/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";


export const reset = async (formData: ResetFormType) => {
  console.log("\x1b[33m", 'ACTION Reset formData: ', "\x1b[0m", formData);

  let validatedResult = ResetFormSchema.safeParse(formData);
  console.log("\x1b[33m", 'ACTION Reset validatedResult: ', "\x1b[0m", validatedResult);
  if (!validatedResult.success) {
    return {error: 'Invalid email!'};
  }

  let { email } = validatedResult.data;
  
  let existingUser = await getUserByEmail(email);
  console.log("RESET ExistingUser: ", existingUser);
  if (!existingUser) {
    return {error: "User not found!"};
  }

  let passwordResetToken = await generatePasswordResetToken(existingUser.email);

  if (!passwordResetToken) {
    return {error: "Something went wrong!"};
  }

  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);
  
  return {success: "Reset email sent!"};
}