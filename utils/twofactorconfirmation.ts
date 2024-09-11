import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async ( userId: string ) => {
  try {
    let twoFactorConfirmation = await db.twoFactorConfirmation.findUnique(
      {
        where: { userId }
      }
    );
    
    return twoFactorConfirmation;

  } catch {
    return null;
  }
}