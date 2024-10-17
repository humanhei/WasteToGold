import { Wishlist } from '@prisma/client'
import prisma from '../prisma'

const include = {
  listings: {
    include: {
        photos: true
    }
  },
  author: true,
}

export const WishlistModel = {
  findMany: () => prisma.wishlist.findMany({
    include
  }),
  findById: (wishlistId: string) => prisma.wishlist.findFirst({
    where: {
      id: wishlistId,
    },
    include
  }),
  findByUserId: (userId: string) => prisma.wishlist.findFirst({
    where: {
      authorId: userId,
    }
  }),
  create: (data: { title: string, authorId: string }) => prisma.wishlist.create({ data }),
  update: (wishlistId: string, data:{ title: string, authorId?: string }) => prisma.wishlist.update({
    where: {
      id: wishlistId,
    },
    data
  }),
  addWishlist: (wishlistId: string, listingId: string) => prisma.wishlist.update({
    where: { id: wishlistId },
    data: {
      listings: { connect: [{ id: listingId }]}
    },
    include
  }),
  removeWishlist: (wishlistId: string, listingId: string) => prisma.wishlist.update({
    where: { id: wishlistId },
    data: {
      listings: { disconnect: [{ id: listingId }]}
    },
    include
  }),
  delete: (wishlistId: string) => prisma.wishlist.delete({ where: { id: wishlistId }})
}
