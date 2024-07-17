import express from 'express'
import { ListingController } from '../controllers/listing.controller'

const router = express.Router()

router.get('/', ListingController.getAllListings)
router.post('/', ListingController.createListing)
router.post('/:listingId', ListingController.updateListing)
router.delete('/:listingId', ListingController.deleteListing)

export default router
