import prisma from '../prisma'

export interface User {
  id: string,
  email: string,
  username: string,
  phone: number,
}

export const UserModel = {
  findMany: () => prisma.user.findMany({
    include: {
    'listings': true,
    'followedBy': true,
    'following': true,
    'reviews': true,
    'wishList': true
  }}),
  getUserById: (userId: string) => prisma.user.findFirst({
    where: { id: userId },
    include: {
      'listings': true,
      'followedBy': true,
      'following': true,
      'reviews': true,
      'wishList': true
    }
  }),
  create: (data: { email: string; username: string, phone: number }) => prisma.user.create({ data }),
}
