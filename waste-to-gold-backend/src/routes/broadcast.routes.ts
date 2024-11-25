import express from 'express'
import { BroadcastController } from '../controllers/broadcast.controller'

const router = express.Router()

router.get('/getAllBroadcast/:userId?', BroadcastController.getAllBroadcast)
router.get('/getBroadcastByUserId/:userId', BroadcastController.getRequestListingByAuthorId)
router.get('/getBroadcastByLoc/:location/user/:userId?', BroadcastController.getBroadcastByLoc)

export default router
