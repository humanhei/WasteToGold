import prisma from '../prisma'

export interface ListingCreateModel {
  sell: boolean,
  title_en: string,
  title_zh: string,
  categoryId?: string,
  subCategoryId?: string,
  condition: string,
  brand: string,
  description: string,
  free: boolean,
  price: number,
  quantity?: number,
  lon?: number,
  lat?: number,
  location?: string,
  authorId: string
}

export interface ListingEditModel {
  sell?: boolean,
  title_en?: string,
  title_zh?: string,
  categoryId?: string,
  subCategoryId?: string,
  condition?: string,
  brand?: string,
  description?: string,
  free?: boolean,
  price?: number,
  lon?: number,
  lat?: number,
  location?: string,
  quantity?: number,
  authorId?: string
}

const listingIncludes = {
  category: true,
  author: true,
  photos: true,
  reviews: true,
  wishlists: true,
}

export const ListingModel = {
  findMany: () => prisma.listing.findMany({
    include: listingIncludes
  }),
  create: (data: ListingCreateModel) => prisma.listing.create({ data }),
  update: (listingId: string, data: ListingEditModel) => prisma.listing.update({
    where: {
      id: listingId,
    },
    data
  }),
  getListing: () => prisma.listing.findMany(),
  getListingById: (listingId: string) => prisma.listing.findFirst({
    where: { id: listingId },
    include: listingIncludes
  }),
  getListingByAuthorId: (userId: string) => prisma.listing.findMany({
    where: {
      authorId: userId,
    },
    include: {
      ...listingIncludes,
      requests: {
        include: {
          listing: {
            include: {
              photos: true
            }
          },
          author: true,
        }
      },
    }
  }),
  getAllRequestListings: (userId?: string) => prisma.listing.findMany({
    where: { sell: false, authorId: { not: userId } },
    include: listingIncludes,
  }),
  getRequestListingByAuthorId: (userId: string) => prisma.listing.findMany({
    where: { sell: false, authorId: userId },
    include: listingIncludes,
  }),
  getRequestListing: (location: string, userId?: string) => prisma.listing.findMany({
    where: { sell: false, location: location, authorId: { not: userId } },
    include: listingIncludes,
  }),
  getManyListingsByIds: (idList: string[]) => prisma.listing.findMany({
    where: { id: { in: idList } },
    include: listingIncludes
  }),
  delete: (listingId: string) => prisma.listing.delete({ where: { id: listingId }}),
  addWishlist: (listingId: string, wishlistId: string) => prisma.listing.update({
    where: { id: listingId },
    data: {
      wishlists: { connect: [{ id: wishlistId }]}
    }
  }),
  removeWishlist: (listingId: string, wishlistId: string) => prisma.listing.update({
    where: { id: listingId },
    data: {
      wishlists: { disconnect: [{ id: wishlistId }]}
    }
  }),
}
