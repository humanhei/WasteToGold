import express from 'express'
import { ListingController } from '../controllers/listing.controller'

const router = express.Router()

router.get('/', ListingController.getAllListings)
router.post('/', ListingController.createListing)
router.post('/:categoryId', ListingController.updateListing)
router.delete('/:categoryId', ListingController.deleteListing)

export default router
