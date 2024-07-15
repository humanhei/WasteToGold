import prisma from '../prisma'

export interface ListingCreateEditModel {
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

export const ListingModel = {
  findMany: () => prisma.listing.findMany(),
  create: (data: ListingCreateEditModel) => prisma.listing.create({ data }),
  update: (listingId: string, data: ListingCreateEditModel) => prisma.listing.update({
    where: {
      id: listingId,
    },
    data
  }),
  getListing: () => prisma.listing.findMany(),
  getListingById: (listingId: string) => prisma.listing.findFirst({ where: { id: listingId } }),
  delete: (listingId: string) => prisma.listing.delete({ where: { id: listingId }})
}
