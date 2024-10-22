import { WishlistModel } from '../models/wishlist.model'
import { Wishlist, Prisma } from '@prisma/client'

type WishlistWithInclude = Prisma.WishlistGetPayload<{
  include: {
    listings: {
      include: {
          photos: true
      }
    },
    author: true,
  }
}>

export const WishlistService = {
  getAllWishlists: async (): Promise<Wishlist[]> => {
    return WishlistModel.findMany()
  },

  getWishlistById: async (wishlistId: string): Promise<Wishlist|null> => {
    return WishlistModel.findById(wishlistId)
  }, 

  getWishlistByUserId: async (userId: string): Promise<WishlistWithInclude[]> => {
    return WishlistModel.findByUserId(userId)
  },
 
  createWishlist: async (title: string, authorId: string): Promise<Wishlist> => {
    const wishlist = await WishlistModel.create({ title, authorId })
    return wishlist
  },

  updateWishlist: async (wishlistId:string, title: string, authorId: string): Promise<Wishlist> => {
    const wishlist = await WishlistModel.update(wishlistId, { title, authorId })
    return wishlist
  },

  addListing: async (wishlistId:string, listingId: string): Promise<Wishlist> => {
    const wishlist = await WishlistModel.addWishlist(wishlistId, listingId)
    return wishlist
  },

  removeListing: async (wishlistId:string, listingId: string): Promise<Wishlist> => {
    const wishlist = await WishlistModel.removeWishlist(wishlistId, listingId)
    return wishlist
  },

  deleteWishlist: async (wishlistId:string): Promise<Wishlist> => {
    const wishlist = await WishlistModel.delete(wishlistId)
    return wishlist
  },
}
