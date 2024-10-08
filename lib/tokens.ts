import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/utils/verificationtoken";
import { getPasswordResetTokenByEmail } from "@/utils/passwordreset";
import { getTwoFactorTokenByEmail } from "@/utils/twofactortoken";


export const generateVerificationToken = async (email: string) => {
  let token = uuidv4();
  let expires = new Date(new Date().getTime() + 3600 * 1000);

  let existingToken = await getVerificationTokenByEmail(email);
  // console.log("\x1b[36m", 'GenerateVerificationToken ExistingToken: ', "\x1b[0m", existingToken);
  
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id }
    }).catch(error => console.log("\x1b[31m", 'GenerateVerificationToken DB VerificationToken Delete Error: ', "\x1b[0m", error));
  }

  let verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  }).catch(error => console.log("\x1b[31m", 'DB VerificationToken Create Error: ', "\x1b[0m", error));
  //console.log("\x1b[36m", 'GenerateVerificationToken new verificationToken: ', "\x1b[0m", verificationToken);
  
  return verificationToken;
}


export const generatePasswordResetToken = async (email: string) => {
  let token = uuidv4();
  let expires = new Date(new Date().getTime() + 3600 * 1000);

  let existingToken = await getPasswordResetTokenByEmail(email);
  // console.log("\x1b[36m", 'GeneratePasswordResetToken ExistingToken: ', "\x1b[0m", existingToken);
  
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id }
    }).catch(error => console.log("\x1b[31m", 'GeneratePasswordResetToken DB PasswordResetToken Delete Error: ', "\x1b[0m", error));
  }

  let passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires
    }
  }).catch(error => console.log("\x1b[31m", 'GeneratePasswordResetToken DB PasswordResetToken Create Error: ', "\x1b[0m", error));
  // console.log("\x1b[36m", 'GeneratePasswordResetToken new passwordResetToken: ', "\x1b[0m", passwordResetToken);
  
  return passwordResetToken;
}


export const generateTwoFactorToken = async (email: string) => {
  let token = crypto.randomInt(100_000, 1_000_000).toString();
  // let expires = new Date(new Date().getTime() + 3600 * 1000);
  let expires = new Date(new Date().getTime() + 15 * 60 * 1000);

  let existingToken = await getTwoFactorTokenByEmail(email);
  // console.log("\x1b[36m%s\x1b[0m", 'GenerateTwoFactorToken ExistingToken: ', existingToken);
  
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id }
    }).catch(error => console.log("\x1b[41m%s\x1b[0m", 'GenerateTwoFactorToken DB TwoFactorToken Delete Error: ', error));
  }

  let twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires
    }
  }).catch(error => console.log("\x1b[41m%s\x1b[0m", 'GenerateTwoFactorToken DB TwoFactorToken Create Error: ', error));
  // console.log("\x1b[36m%s\x1b[0m", 'GenerateTwoFactorToken new twoFactorToken: ', twoFactorToken);
  
  return twoFactorToken;
}