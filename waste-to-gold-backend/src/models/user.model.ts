import prisma from '../prisma'

export interface User {
  id: string,
  email: string,
  username: string,
  phone: number,
}

export const UserModel = {
  findMany: () => prisma.user.findMany(),
  create: (data: { email: string; username: string, phone: number }) => prisma.user.create({ data }),
}
