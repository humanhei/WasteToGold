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
  findChatListByUserId: (userId: String) => prisma.$queryRaw`
      SELECT DISTINCT
        CASE
          WHEN m."fromUserId" = ${userId} THEN m."toUserId"
          ELSE m."fromUserId"
        END AS "userId",
        u.username,
        m."timestamp" as "lastMessageAt"
      FROM "Message" m
      JOIN "User" u ON (
        CASE
          WHEN m."fromUserId" = ${userId} THEN m."toUserId" = u.id
          ELSE m."fromUserId" = u.id
        END
      )
      WHERE m."fromUserId" = ${userId} OR m."toUserId" = ${userId}
      ORDER BY m."timestamp" DESC
      LIMIT 50
    `,
}
