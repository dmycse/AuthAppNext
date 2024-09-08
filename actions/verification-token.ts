'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/utils/user';
import { getVerificationTokenByToken } from '@/utils/verificationtoken';



export const verificationToken = async (token: string) => {
  console.log('\x1b[33m','ACTION VerificationToken token in: ', '\x1b[0m', token);
  let existingToken = await getVerificationTokenByToken(token);
  console.log('\x1b[33m','ACTION VerificationToken existingToken: ', '\x1b[0m', existingToken);

  if (!existingToken) {
    return {error: "Token does not exist!"};
  }

  let isTokenExpired = new Date(existingToken.expires) < new Date();

  if (isTokenExpired) {
    return {error: "Token has expired!"};
  }

  let existingUser = await getUserByEmail(existingToken.email);
  console.log('\x1b[33m','ACTION VerificationToken existingUser: ','\x1b[0m', existingUser);
  if (!existingUser) {
    // * Email does not exist
    return {error: "User does not exist!"};
  }

  await db.user.update({
    where: {id: existingUser.id},
    data: {
      emailVerified: new Date(),
      email: existingToken.email
    }
  })
    .catch(error => console.log("\x1b[31m",'ACTION VerificationToken DB User Update Error: ',"\x1b[0m", error));

  await db.verificationToken.delete({
    where: {id: existingToken.id}
  })
  .catch(error => console.log("\x1b[31m",'ACTION VerificationToken DB VerificationToken Delete Error: ',"\x1b[0m", error));

  return {success: "Email has been verified!"};
}
