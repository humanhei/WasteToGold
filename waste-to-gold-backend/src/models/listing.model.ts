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
      photos: true,
      reviews: true,
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
  getListingById: (listingId: string) => prisma.listing.findFirst({ where: { id: listingId } }),
  delete: (listingId: string) => prisma.listing.delete({ where: { id: listingId }})
}
