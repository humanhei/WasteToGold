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

  getRequestByRequesterId: async (userId: string): Promise<Request[]> => {
    return RequestModel.findByRequesterId(userId);
  },

  getRequestsByListingIdList: async (listingIdList: string[]): Promise<Request[]> => {
    return RequestModel.findByListingIdList(listingIdList);
  },

  createRequest: async (unit: number, listingId: string, authorId: string): Promise<Request> => {
    const listing = await ListingModel.getListingById(listingId);
    if (listing?.quantity == null || listing?.quantity < unit) {
      throw Error("Not enough Quantity for sell")
    }
    const requestObj = await RequestModel.create({ unit, listingId, authorId })
    return requestObj
  },

  approveRequest: async (requestId:string): Promise<Request> => {
    const requestObj = await RequestModel.update(requestId, { status: "APPROVED" })
    const requestList = await RequestModel.findByListingIdList([requestObj.listingId])
    const listingObj = await ListingModel.getListingById(requestObj.listingId)
    const newListingObj = await ListingModel.update(listingObj?.id || "", {quantity: listingObj?.quantity || 0 - requestObj.unit})
    for (const request of requestList) {
      if (newListingObj?.quantity == null || newListingObj.quantity < request.unit){
        await RequestModel.update(request.id, { status: "REJECTED" })
      }
    }
    return requestObj
  },

  rejectRequest: async (requestId:string): Promise<Request> => {
    const requestObj = await RequestModel.update(requestId, { status: "REJECTED" })
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
