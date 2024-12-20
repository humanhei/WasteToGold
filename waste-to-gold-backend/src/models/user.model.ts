import { Prisma } from '@prisma/client'
import prisma from '../prisma'

const include = {
  'listings': true,
  'followedBy': true,
  'following': true,
  'reviews': true
}


export type UserWithIncludes = Prisma.UserGetPayload<{
  include: {
    'listings': true,
    'followedBy': true,
    'following': true,
    'reviews': true
  }
}>

export const UserModel = {
  findMany: () => prisma.user.findMany({
    include
  }),
  getUserById: (userId: string) => prisma.user.findFirst({
    where: { id: userId },
    include
  }),
  getUserByIdList: (userIdList: string[]) => prisma.user.findMany({
    where: { id: { in: userIdList } },
  }),
  
  getUserChatById: (userId: string) => prisma.user.findFirst({
    where: { id: userId },
    include: {
      sentMessages: {
        include: {
          toUser: true
        }
      },
      receivedMessages: {
        include: {
          fromUser: true
        }
      },
    }
  }),
  getUserByEmail: (email: string) => prisma.user.findFirst({
    where: { email },
    include
  }),
  getUserByPhone: (phone: number) => prisma.user.findFirst({
    where: { phone },
    include
  }),
  getUserByUsername: (username: string) => prisma.user.findFirst({
    where: { username },
    include
  }),
  create: (data: { email?: string; username: string, phone?: number }) => prisma.user.create({ data }),
}
