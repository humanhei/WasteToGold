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

  getListingByAuthorId: async (req: Request, res: Response) => {
    const { userId } = req.params
    try {
      const listings = await ListingService.getListingByAuthorId(userId)
      res.json(listings)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve listings' })
    }
  },

  getListingById: async (req: Request, res: Response) => {
    const { listingId } = req.params
    try {
      const listing = await ListingService.getListingById(listingId)
      res.json(listing)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve listing' })
    }
  },

  getManyListingsByIds: async (req: Request, res: Response) => {
    const { listingIds } = req.params
    const idList = listingIds.split(',')
    try {
      const listings = await ListingService.getManyListingsByIds(idList)
      res.json(listings)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve listing' })
    }
  },

  getRequestListing: async (req: Request, res: Response) => {
    const { location, userId } = req.params
    try {
      const listings = await ListingService.getRequestListings(location, userId)
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
      subCategoryId,
      condition,
      brand,
      description,
      free,
      lat,
      lon,
      location,
      quantity,
      price,
      authorId,
     } = req.body
    try {
      const listing = await ListingService.createListing({ 
        sell,
        title_en,
        title_zh,
        categoryId,
        subCategoryId,
        condition,
        brand,
        description,
        free,
        lat,
        lon,
        location,
        quantity,
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
      subCategoryId,
      condition,
      brand,
      description,
      free,
      price,
      lat,
      lon,
      location,
      quantity,
      authorId,
     } = req.body;
    try {
      const listing = await ListingService.updateListing(listingId, { 
        sell,
        title_en,
        title_zh,
        categoryId,
        subCategoryId,
        condition,
        brand,
        description,
        free,
        price,
        lat,
        lon,
        location,
        quantity,
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
    const { listingId } = req.params
    try {
      const listing = await ListingService.deleteListing(listingId)
      res.json(listing)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  addWishlist: async (req: Request, res: Response) => {
    const { listingId, wishlistId } = req.params
    console.log(`Add Wishlist for Wishlist(${wishlistId}) on Listing(${listingId})`)
    try {
      const listing = await ListingService.addWishlist(listingId, wishlistId)
      res.status(201).json(listing)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  removeWishlist: async (req: Request, res: Response) => {
    const { listingId, wishlistId } = req.params
    try {
      const listing = await ListingService.removeWishlist(listingId, wishlistId)
      res.status(201).json(listing)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },
}
