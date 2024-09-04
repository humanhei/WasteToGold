import { Message } from '@prisma/client'
import prisma from '../prisma'

export const MessageModel = {
  create: (data: { fromUserId: string, toUserId: string, content: string }) => prisma.message.create({
    data: {
      fromUser: { connect: { id: data.fromUserId } },
      toUser: { connect: { id: data.toUserId } },
      content: data.content,
    }
  }),
  findChatHistory: (user1Id: string, user2Id: string) => prisma.message.findMany({
    where: {
      OR: [
        { fromUserId: user1Id, toUserId: user2Id },
        { fromUserId: user2Id, toUserId: user1Id },
      ],
    },
    include: {
      fromUser: { select: { username: true } },
      toUser: { select: { username: true } },
    },
    orderBy: { timestamp: 'asc' },
  }),
}
