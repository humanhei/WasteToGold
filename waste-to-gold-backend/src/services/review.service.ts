import { ReviewModel } from '../models/review.model'
import { Review, Prisma } from '@prisma/client'

export const ReviewService = {
  getAllReviews: async (): Promise<Review[]> => {
    return ReviewModel.findMany()
  },

  getReviewById: async (reviewId: string): Promise<Review | null> => {
    return ReviewModel.findById(reviewId);
  },

  getReviewByListingId: async (listingId: string): Promise<Review | null> => {
    return ReviewModel.findByListingId(listingId);
  },

  createReview: async (rating: string[], listingId: string, authorId: string, review?: string): Promise<Review> => {
    const reviewObj = await ReviewModel.create({ rating, listingId, authorId, review,})
    return reviewObj
  },

  updateReview: async (reviewId:string, rating: string[], listingId: string, authorId: string, review?: string, ): Promise<Review> => {
    const reviewObj = await ReviewModel.update(reviewId, { rating, listingId, authorId, review})
    return reviewObj
  },

  deleteReview: async (reviewId:string): Promise<Review> => {
    const reviewObj = await ReviewModel.delete(reviewId)
    return reviewObj
  },
}
