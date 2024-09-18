"use server";

import { db } from "@/lib/db";
import { SettingsFormSchema, type SettingsFormType } from "@/schemas";

import { getUserByEmail, getUserById } from "@/utils/user";
import { authUser } from "@/utils/authuser";
import { Prisma } from "@prisma/client";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { createPasswordHash, mathcUserPassword } from "@/utils/pass";


export const settings = async (values: SettingsFormType) => {
  // console.log("\x1b[33m%s\x1b[0m",'ACTION Settings values: ', values);
  let currentUser = await authUser();

  if (!currentUser) {
    return {error: "User is unauthorized!"};
  }

  let dbUser = await getUserById(currentUser.id as string);

  if (!dbUser) {
    return {error: "User not found!"};
  }

  let validateValues = SettingsFormSchema.safeParse(values);
  // console.log("\x1b[33m%s\x1b[0m",'ACTION Settings validateValues: ', validateValues.data);
  if (!validateValues.success) {
    return {error: 'Invalid data. Try again.'};
  }

  let {name, email, password, newPassword, isTwoFactorEnabled, role} = validateValues.data;
  
  let dataForUpdate: SettingsFormType = {
    name: name !== currentUser.name ? name : undefined,
    role: role !== currentUser.role ? role : currentUser.role
  };
  
  // * These logic below are for non-OAuth users
  if (!currentUser.isOAuth) {

      if (email && email !== currentUser.email) {
        let userExists = await getUserByEmail(values.email as string);
        
        if (userExists && userExists.id !== currentUser.id) {
          return {error: "Email is already taken!"};
        }
    
        let verificationToken = await generateVerificationToken(email as string);

        if (verificationToken) {
          await sendVerificationEmail(verificationToken.email, verificationToken.token);
          return {success: "Verification email sent!"};
        }
        else {
          return {error: 'Something went wrong! Email has not been changed!'};
        }
      }

      if (password && !newPassword) {
        return {error: "Don't enter your password if you don't want to change it!"};
      }

      if (newPassword && !password) {
        return {error: "Password is required!"};
      }

      if (password && newPassword && dbUser.password) {
          let passwordMatch = await mathcUserPassword({email: dbUser.email, password});

          if (!passwordMatch) {
            return {error: "Incorrect password!"};
          }

          let hashedPassword = await createPasswordHash(newPassword);

          if (!hashedPassword) {
            return {error: "Password change cannot be done! Try again."};
          }

          dataForUpdate.password = hashedPassword;
        }

        dataForUpdate.isTwoFactorEnabled = isTwoFactorEnabled !== currentUser.isTwoFactorEnabled 
                                            ? isTwoFactorEnabled 
                                            : undefined;

  }
  
  // These data below are not editable for OAuth users
  // if (currentUser.isOAuth) {
  //   values.name = values.name !== currentUser.name ? values.name : undefined;
  //   values.email = undefined;
  //   values.password = undefined;
  //   values.newPassword = undefined;
  //   values.isTwoFactorEnabled = undefined;
  // }

  //console.log("\x1b[33m%s\x1b[0m", 'ACTION Settings dataForUpdate: ', dataForUpdate);
  await db.user.update({
    where: {id: dbUser.id},
    data: {...dataForUpdate}
  })
  .catch(error => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("\x1b[31m%s\x1b[0m", 'ACTION Settings DB User Update Error: ', error.code);
    }
    // console.log("\x1b[31m%s\x1b[0m", 'ACTION Settings DB User Update Error: ', error);
    return {error: "Something went wrong!"}
  });
  
  return {success: "Your data has been updated!"};
}