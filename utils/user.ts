import { db } from '@/lib/db';


export let getUserByEmail = async (email: string) => {
  try {
    let user = await db.user.findUnique({where: { email }});

    return user;
    
  } catch {
      return null;
  }
};

export let getUserById = async (id: string) => {
  try {

    let user = await db.user.findUnique({where: { id }});

    return user;
    
  } catch {
      return null;
  }
};