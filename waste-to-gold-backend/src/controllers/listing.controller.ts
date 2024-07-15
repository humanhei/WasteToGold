import { Request, Response } from 'express'
import { ListingService } from '../services/listing.service'

export const ListingController = {
  getAllListings: async (req: Request, res: Response) => {
    try {
      const listings = await ListingService.getAllListings()
      res.json(listings)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve listings' })
    }
  },

  createListing: async (req: Request, res: Response) => {
    const { 
      sell,
      title_en,
      title_zh,
      categoryId,
      condition,
      brand,
      description,
      free,
      price,
      authorId,
     } = req.body
    try {
      const listing = await ListingService.createListing({ 
        sell,
        title_en,
        title_zh,
        categoryId,
        condition,
        brand,
        description,
        free,
        price,
        authorId,
       })
      res.status(201).json(listing)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  updateListing: async (req: Request, res: Response) => {
    const { listingId } = req.params;
    const { 
      sell,
      title_en,
      title_zh,
      categoryId,
      condition,
      brand,
      description,
      free,
      price,
      authorId,
     } = req.body;
    try {
      const listing = await ListingService.updateListing(listingId, { 
        sell,
        title_en,
        title_zh,
        categoryId,
        condition,
        brand,
        description,
        free,
        price,
        authorId,
       })
      res.status(201).json(listing)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  deleteListing: async (req: Request, res: Response) => {
    const { categoryId } = req.params
    try {
      const listing = await ListingService.deleteListing(categoryId)
      res.status(201).json(listing)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },
}