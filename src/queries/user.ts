"use server";

import { db } from "@/server/db";
import { type User } from "@clerk/nextjs/server";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email: email } });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const AddUser = async (user: User) => {
  try {
    console.log(user)
    const newUser = await db.user.create({data:{name:user.firstName ??"" , email:user.primaryEmailAddress?.emailAddress ?? ""}})
    return newUser
  } catch (e) {
    console.log(e)
  }
};
