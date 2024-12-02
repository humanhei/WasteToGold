const { concat, orderBy, uniqBy, merge, find, map } = require('lodash')

import { MessageModel } from '../models/message.model'
import { Prisma, Message } from '@prisma/client'
import { UserModel } from '../models/user.model';

export const MessageService = {
  findChatHistory: async (user1Id: string, user2Id: string): Promise<Message[]> => {
    try {
      const messages = await MessageModel.findChatHistory(user1Id, user2Id);
      const readMsgIdList = messages.map((msg) => {
        if(msg.toUserId == user1Id){
          return msg.id
        }
      }).filter(item => typeof item ==='string')
      await MessageModel.readMsg(readMsgIdList)
      return messages.map(msg => ({
        id: msg.id,
        fromUserId: msg.fromUserId,
        fromUsername: msg.fromUser.username,
        toUserId: msg.toUserId,
        toUsername: msg.toUser.username,
        read: msg.read,
        content: msg.content,
        timestamp: msg.timestamp,
      }));
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error;
    }
  },

  findChatListByUserId: async (userId: string): Promise<unknown> => {
    try {
      const user = await UserModel.getUserChatById(userId);
      const sentChatList = user?.sentMessages.map((msg) => ({
        id: msg.id,
        userId: msg.toUserId,
        content: msg.content,
        read: msg.read,
        timeStamp: msg.timestamp,
      }))
      const receivedChatList = user?.receivedMessages.map((msg) => ({
        id: msg.id,
        userId: msg.fromUserId,
        content: msg.content,
        read: msg.read,
        timeStamp: msg.timestamp,
      }))
      const fullChatList = orderBy(concat(sentChatList, receivedChatList), 'timeStamp', 'desc')
      const chatList = uniqBy(fullChatList, 'userId')
      return chatList;
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
