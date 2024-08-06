import prisma from '../prisma'

export interface User {
  id: string,
  email: string,
  username: string,
  phone: number,
}

const include = {
  'listings': true,
  'followedBy': true,
  'following': true,
  'reviews': true,
  'wishList': true
}

export const UserModel = {
  findMany: () => prisma.user.findMany({
    include
  }),
  getUserById: (userId: string) => prisma.user.findFirst({
    where: { id: userId },
    include
  }),
  getUserByEmail: (email: string) => prisma.user.findFirst({
    where: { email },
    include
  }),
  getUserByPhone: (phone: number) => prisma.user.findFirst({
    where: { phone },
    include
  }),
  create: (data: { email: string; username: string, phone: number }) => prisma.user.create({ data }),
}
