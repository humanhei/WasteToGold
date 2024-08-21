import express from 'express'
import { ListingController } from '../controllers/listing.controller'

const router = express.Router()

router.get('/', ListingController.getAllListings)
router.get('/:listingId', ListingController.getListingById)
router.post('/', ListingController.createListing)
router.post('/:listingId', ListingController.updateListing)
router.post('/:listingId/addwishlist/:userId', ListingController.addWishlist)
router.post('/:listingId/removewishlist/:userId', ListingController.removeWishlist)
router.delete('/:listingId', ListingController.deleteListing)

export default router
