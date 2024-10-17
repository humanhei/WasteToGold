import express from 'express'
import { WishlistController } from '../controllers/wishlist.controller'

const router = express.Router()

router.get('/', WishlistController.getAllWishlists)
router.get('/getById/:wishlistId', WishlistController.getWishlistById)
router.get('/getByuserId/:userId', WishlistController.getWishlistByUserId)
router.post('/', WishlistController.createWishlist)
router.post('/:wishlistId', WishlistController.updateWishlist)
router.post('/:wishlistId/addlisting/:listingId', WishlistController.addListing)
router.post('/:wishlistId/removelisting/:listingId', WishlistController.removeListing)
router.delete('/:wishlistId', WishlistController.deleteWishlist)

export default router

