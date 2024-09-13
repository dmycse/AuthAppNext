"use server";

import { db } from "@/lib/db";
import type { SettingsFormType } from "@/schemas";

import { getUserById } from "@/utils/user";
import { authUser } from "@/utils/authuser";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


export const settings = async (values: SettingsFormType) => {
  console.log('ACTION Settings values: ', values);
  let currentUser = await authUser();

  if (!currentUser) {
    return {error: "User is unauthorized!"};
  }

  // let name = values.get('name') as SettingsType['name'];

  let dbUser = await getUserById(currentUser.id as string);

  if (!dbUser) {
    return {error: "User not found!"};
  }
  console.log('ACTION Settings dbUser: ', dbUser);
  await db.user.update({
    where: {id: dbUser.id},
    data: {...values}
  })
  .catch(error => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log('ACTION Settings DB User Update Error: ', error.code);
    }
    return {error: "Something went wrong!"}
  });

  return {success: "Name updated!"};
}