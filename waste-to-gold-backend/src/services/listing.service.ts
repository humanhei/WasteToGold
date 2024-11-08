import { ListingModel, ListingCreateModel, ListingEditModel } from '../models/listing.model'
import * as photoModel from '../models/photo.model';
import * as s3Service from '../services/s3.service';
import { Listing, Request, Prisma } from '@prisma/client'

interface listingRequestModel {
  id: String,
  requests: Request[],
  authorId: string,
}

export const ListingService = {
  getAllListings: async (): Promise<Listing[]> => {
    return ListingModel.findMany()
  },

  getListingById: async (listingId: string): Promise<Listing|null> => {
    return ListingModel.getListingById(listingId)
  },

  getListingByAuthorId: async (userId: string): Promise<listingRequestModel[]> => {
    return ListingModel.getListingByAuthorId(userId)
  },

  getManyListingsByIds: async (idList: string[]): Promise<Listing[]> => {
    return ListingModel.getManyListingsByIds(idList)
  },

  getRequestListings: async (location: string): Promise<Listing[]> => {
    return ListingModel.getRequestListing(location)
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
    const photos = await photoModel.getAllPhotosByListingId(listingId);
    for (const photo of photos){
      const s3result = await s3Service.deleteObjS3(photo.fileName)
      const photoResult = await photoModel.deletePhoto(photo.id) 
    }
    const listing = await ListingModel.delete(listingId)
    return listing
  },

  addWishlist: async (listingId:string, wishlistId: string): Promise<Listing> => {
    const listing = await ListingModel.addWishlist(listingId, wishlistId)
    return listing
  },

  removeWishlist: async (listingId:string, wishlistId: string): Promise<Listing> => {
    const listing = await ListingModel.removeWishlist(listingId, wishlistId)
    return listing
  },
}
