import { Request, Response } from 'express'
import { ReviewService } from '../services/review.service'

export const ReviewController = {
  getAllReviews: async (req: Request, res: Response) => {
    try {
      const categories = await ReviewService.getAllReviews()
      res.json(categories)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve reviews' })
    }
  },

  getReviewById: async (req: Request, res: Response) => {
    try {
      const { reviewId } = req.params;
      const review = await ReviewService.getReviewById(reviewId)
      res.json(review)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve review' })
    }
  },

  getReviewByListingId: async (req: Request, res: Response) => {
    try {
      const { listingId } = req.params;
      const review = await ReviewService.getReviewByListingId(listingId)
      res.json(review)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve review' })
    }
  },

  createReview: async (req: Request, res: Response) => {
    const { review, rating, listingId, authorId } = req.body
    try {
      const reviewObj = await ReviewService.createReview(rating, listingId, authorId, review)
      res.status(201).json(reviewObj)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  updateReview: async (req: Request, res: Response) => {
    const { reviewId } = req.params;
    const { review, rating, listingId, authorId } = req.body;
    try {
      const reviewObj = await ReviewService.updateReview(reviewId, rating, listingId, authorId, review)
      res.status(201).json(reviewObj)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  deleteReview: async (req: Request, res: Response) => {
    const { reviewId } = req.params
    try {
      const review = await ReviewService.deleteReview(reviewId)
      res.status(201).json(review)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },
}