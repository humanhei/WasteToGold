import express from 'express'
import { MessageController } from '../controllers/message.controller'

const router = express.Router()

router.get('/:user1Id/:user2Id', MessageController.getChatHistory)
router.post('/', MessageController.sendMessage)

export default router