import express from 'express'
import { ReviewController } from '../controllers/review.controller'

const router = express.Router()

router.get('/', ReviewController.getAllReviews)
router.get('/getById/:reviewId', ReviewController.getReviewById)
router.get('/getByListingId/:listingId', ReviewController.getReviewByListingId)
router.post('/', ReviewController.createReview)
router.post('/:reviewId', ReviewController.updateReview)
router.delete('/:reviewId', ReviewController.deleteReview)

export default router
