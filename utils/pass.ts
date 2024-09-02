import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/utils/user';

let saltRounds = 10;

export let createPasswordHash = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};

export let mathcUserPassword = async ({ email, password } : {email: string, password: string}) => {

  let user = await getUserByEmail(email);

  if (!user?.password) return null;
        
  let isUserPasswordMatch = await bcrypt.compare(password, user.password);

  if (isUserPasswordMatch) return user;

  return null;
};