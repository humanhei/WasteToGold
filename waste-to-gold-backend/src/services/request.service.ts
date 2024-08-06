import { ListingModel } from '../models/listing.model';
import { RequestModel } from '../models/request.model'
import { Request } from '@prisma/client'

export const RequestService = {
  getAllRequests: async (): Promise<Request[]> => {
    return RequestModel.findMany()
  },

  getRequestById: async (requestId: string): Promise<Request | null> => {
    return RequestModel.findById(requestId);
  },

  getRequestByListingId: async (listingId: string): Promise<Request | null> => {
    return RequestModel.findByListingId(listingId);
  },

  createRequest: async (unit: number, listingId: string, authorId: string): Promise<Request> => {
    const listing = await ListingModel.getListingById(listingId);
    if (listing?.quantity && listing?.quantity < unit) {
      throw Error("Not enough Quantity for sell")
    }
    const requestObj = await RequestModel.create({ unit, listingId, authorId })
    return requestObj
  },

  updateRequest: async (requestId:string, unit: number, status: string, listingId: string, authorId: string): Promise<Request> => {
    const requestObj = await RequestModel.update(requestId, { unit, status, listingId, authorId })
    return requestObj
  },

  deleteRequest: async (requestId:string): Promise<Request> => {
    const requestObj = await RequestModel.delete(requestId)
    return requestObj
  },
}
