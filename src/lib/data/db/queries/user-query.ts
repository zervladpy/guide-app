import { User } from "../../types/types";
import { prisma } from "../prisma";

export async function saveUser(user: User) {

  return await prisma.user.create({
    data: user
  })

}

export async function updateUser(user: User) {

  return await prisma.user.update({
    where: { id: user.id },
    data: {
      avatarUrl: user.avatarUrl,
      fullName: user.fullName,
    }
  })

}

export async function getUser(id: string) {

  const user = await prisma.user.findUnique({
    where: { id }
  })

  return user;

}
