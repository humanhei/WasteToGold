const { flatten } = require('lodash')

import { Request, Response } from 'express'
import { WishlistService } from '../services/wishlist.service'

export const WishlistController = {
  getAllWishlists: async (req: Request, res: Response) => {
    try {
      const wishlists = await WishlistService.getAllWishlists()
      res.json(wishlists)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve wishlists' })
    }
  },

  getWishlistById: async (req: Request, res: Response) => {
    const { wishlistId } = req.params
    try {
      const wishlist = await WishlistService.getWishlistById(wishlistId)
      res.json(wishlist)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve wishlist' })
    }
  },

  getWishlistByUserId: async (req: Request, res: Response) => {
    const { userId } = req.params
    try {
      const wishlist = await WishlistService.getWishlistByUserId(userId)
      const wishlistListings = wishlist.map((wish) => wish.listings).flat()
      const likedListingIds = wishlistListings.map((listing) => listing.id)
      res.json({ likedListingIds, wishlist})
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve wishlists' })
    }
  },

  createWishlist: async (req: Request, res: Response) => {
    const { title, authorId } = req.body
    try {
      const wishlist = await WishlistService.createWishlist(title, authorId)
      res.status(201).json(wishlist)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  updateWishlist: async (req: Request, res: Response) => {
    const { wishlistId } = req.params;
    const { title, authorId } = req.body;
    try {
      const wishlist = await WishlistService.updateWishlist(wishlistId, title, authorId)
      res.status(201).json(wishlist)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  addListing: async (req: Request, res: Response) => {
    const { wishlistId, listingId } = req.params;
    try {
      const wishlist = await WishlistService.addListing(wishlistId, listingId)
      res.status(201).json(wishlist)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  removeListing: async (req: Request, res: Response) => {
    const { wishlistId, listingId } = req.params;
    try {
      const wishlist = await WishlistService.removeListing(wishlistId, listingId)
      res.status(201).json(wishlist)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  deleteWishlist: async (req: Request, res: Response) => {
    const { wishlistId } = req.params
    try {
      const wishlist = await WishlistService.deleteWishlist(wishlistId)
      res.json(wishlist)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },
}