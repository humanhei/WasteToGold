import prisma from '../prisma'

export interface ListingCreateModel {
  sell: boolean,
  title_en: string,
  title_zh: string,
  categoryId: string,
  condition: string,
  brand: string,
  description: string,
  free: boolean,
  price: number,
  authorId: string
}

export interface ListingEditModel {
  sell?: boolean,
  title_en?: string,
  title_zh?: string,
  categoryId?: string,
  condition?: string,
  brand?: string,
  description?: string,
  free?: boolean,
  price?: number,
  authorId?: string
}

export const ListingModel = {
  findMany: () => prisma.listing.findMany({
    include: {
      category: true,
      author: true,
      photos: true,
      reviews: true,
      wishList: true,
    }
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
    include: {
      category: true,
      author: true,
      photos: true,
      reviews: true,
      wishList: true,
    }
  }),
  delete: (listingId: string) => prisma.listing.delete({ where: { id: listingId }}),
  addWishlist: (listingId: string, userId: string) => prisma.listing.update({
    where: { id: listingId },
    data: {
      wishList: { connect: [{ id: userId }]}
    }
  }),
  removeWishlist: (listingId: string, userId: string) => prisma.listing.update({
    where: { id: listingId },
    data: {
      wishList: { disconnect: [{ id: userId }]}
    }
  }),
}
