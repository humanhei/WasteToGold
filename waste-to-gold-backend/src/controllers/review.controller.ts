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
      const category = await ReviewService.createReview(review, rating, listingId, authorId)
      res.status(201).json(category)
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
      const category = await ReviewService.updateReview(reviewId, review, rating, listingId, authorId)
      res.status(201).json(category)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  deleteReview: async (req: Request, res: Response) => {
    const { reviewId } = req.params
    try {
      const category = await ReviewService.deleteReview(reviewId)
      res.status(201).json(category)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },
}