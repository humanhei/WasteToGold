import express from 'express'
import { ListingController } from '../controllers/listing.controller'

const router = express.Router()

router.get('/', ListingController.getAllListings)
router.get('/getById/:listingIds', ListingController.getManyListingsByIds)
router.get('/getReqByLoc', ListingController.getRequestListing)
router.post('/', ListingController.createListing)
router.post('/:listingId', ListingController.updateListing)
router.post('/:listingId/addwishlist/:wishlistId', ListingController.addWishlist)
router.post('/:listingId/removewishlist/:wishlistId', ListingController.removeWishlist)
router.delete('/:listingId', ListingController.deleteListing)

export default router
