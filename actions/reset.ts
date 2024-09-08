"use server";

// import { sendResetEmail } from "@/lib/mail";
import { ResetFormSchema } from "@/schemas";
import type { ResetFormType } from "@/schemas";
import { getUserByEmail } from "@/utils/user";


export const reset = async (formData: ResetFormType) => {
  console.log("\x1b[33m", 'ACTION Reset formData: ', "\x1b[0m", formData);

  let validatedResult = ResetFormSchema.safeParse(formData);
  console.log("\x1b[33m", 'ACTION Reset validatedResult: ', "\x1b[0m", validatedResult);
  if (!validatedResult.success) {
    return {error: 'Invalid email. Try again.'};
  }

  let { email } = validatedResult.data;
  
  let existingUser = await getUserByEmail(email);
  console.log("RESET ExistingUser: ", existingUser);
  if (!existingUser) {
    return {error: "Email not found!"};
  }

  // Todo: Generate a token and send it to the user
  // let resetToken = await sendResetEmail(email);

  // if (!resetToken) {
  //   return {error: "Something went wrong!"};
  // }
 
  return {success: "Reset email sent!"};
}