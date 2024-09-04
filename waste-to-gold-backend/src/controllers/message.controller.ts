import { Request, Response } from 'express'
import { MessageService } from '../services/message.service'

export const MessageController = {
  sendMessage: async (req: Request, res: Response) => {
    const { fromUserId, toUserId, content } = req.body;
    try {
      const message = await MessageService.sendMessage(fromUserId, toUserId, content)
      res.status(201).json(message)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve categories' })
    }
  },

  getChatHistory: async (req: Request, res: Response) => {
    const { user1Id, user2Id } = req.params
    try {
      const msgHistory = await MessageService.findChatHistory(user1Id, user2Id)
      res.status(201).json(msgHistory)
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ errors: [{ message: error.message }] });
        }
    }
  },
}