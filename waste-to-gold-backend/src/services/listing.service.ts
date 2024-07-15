import { ListingId } from 'aws-sdk/clients/datazone'
import { ListingModel, ListingCreateEditModel } from '../models/listing.model'
import { Listing, Prisma } from '@prisma/client'

export const ListingService = {
  getAllListings: async (): Promise<Listing[]> => {
    return ListingModel.findMany()
  },

  createListing: async (listingModel: ListingCreateEditModel): Promise<Listing> => {
    const listing = await ListingModel.create(listingModel)
    return listing
  },

  updateListing: async (listingId:string, listingModel: ListingCreateEditModel): Promise<Listing> => {
    const listing = await ListingModel.update(listingId, listingModel)
    return listing
  },

  deleteListing: async (categoryId:string): Promise<Listing> => {
    const listing = await ListingModel.delete(categoryId)
    return listing
  },
}
