import { MessageModel } from '../models/message.model'
import { Prisma, Message } from '@prisma/client'

export const MessageService = {
  findChatHistory: async (user1Id: string, user2Id: string): Promise<Message[]> => {try {
    const messages = await MessageModel.findChatHistory(user1Id, user2Id);
    return messages.map(msg => ({
      id: msg.id,
      fromUserId: msg.fromUserId,
      fromUsername: msg.fromUser.username,
      toUserId: msg.toUserId,
      toUsername: msg.toUser.username,
      content: msg.content,
      timestamp: msg.timestamp,
    }));
  } catch (error) {
    console.error('Error fetching chat history:', error);
    throw error;
  }
},

  sendMessage: async (fromUserId: string, toUserId: string, content: string): Promise<Message> => {
    try {
      return await MessageModel.create({ fromUserId, toUserId, content });
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
}