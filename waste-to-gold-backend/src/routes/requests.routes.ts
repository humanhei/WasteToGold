import express from 'express'
import { RequestController } from '../controllers/request.controller'

const router = express.Router()

router.get('/', RequestController.getAllRequests)
router.get('/getById/:requestId', RequestController.getRequestById)
router.get('/getByListingId/:listingId', RequestController.getRequestsByListingId)
router.get('/getByUserId/:userId', RequestController.getRequestsByUserId)
router.get('/getByRequesterId/:userId', RequestController.getRequestsByRequesterId)
router.post('/', RequestController.createRequest)
router.post('/approve/:requestId', RequestController.approveRequest)
router.post('/reject/:requestId', RequestController.rejectRequest)
router.put('/:requestId', RequestController.updateRequest)
router.delete('/:requestId', RequestController.deleteRequest)

export default router
