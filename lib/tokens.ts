import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/utils/verificationtoken";


export const generateVerificationToken = async (email: string) => {
  let token = uuidv4();
  let expires = new Date(new Date().getTime() + 3600 * 1000);

  let existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id }
    }).catch(error => console.log("\x1b[31m", 'VerificationToken DB Delete Error: ', error, "\x1b[0m"));
  }

  let verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  }).catch(error => console.log("\x1b[31m", 'VerificationToken DB Create Error: ', error, "\x1b[0m"));

  return verificationToken;
}