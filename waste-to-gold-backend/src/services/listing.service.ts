import { ListingId } from 'aws-sdk/clients/datazone'
import { ListingModel, ListingCreateModel, ListingEditModel } from '../models/listing.model'
import * as photoModel from '../models/photo.model';
import * as s3Service from '../services/s3.service';
import { Listing, Prisma } from '@prisma/client'

export const ListingService = {
  getAllListings: async (): Promise<Listing[]> => {
    return ListingModel.findMany()
  },

  getListingById: async (listingId: string): Promise<Listing|null> => {
    return ListingModel.getListingById(listingId)
  },

  createListing: async (listingModel: ListingCreateModel): Promise<Listing> => {
    const listing = await ListingModel.create(listingModel)
    return listing
  },

  updateListing: async (listingId:string, listingModel: ListingEditModel): Promise<Listing> => {
    const listing = await ListingModel.update(listingId, listingModel)
    return listing
  },

  deleteListing: async (listingId:string): Promise<Listing> => {
    const listing = await ListingModel.delete(listingId)
    return listing
  },

  addWishlist: async (listingId:string, userId: string): Promise<Listing> => {
    const listing = await ListingModel.addWishlist(listingId, userId)
    return listing
  },

  removeWishlist: async (listingId:string, userId: string): Promise<Listing> => {
    const listing = await ListingModel.removeWishlist(listingId, userId)
    return listing
  },
}
