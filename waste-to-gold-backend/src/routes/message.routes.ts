import express from 'express'
import { MessageController } from '../controllers/message.controller'

const router = express.Router()

router.get('/messages/:user1Id/:user2Id', MessageController.getChatHistory)
router.get('/chats/:userId', MessageController.getChatListByUserId)
router.post('/messages', MessageController.sendMessage)

export default router