import { Request } from '@prisma/client'
import prisma from '../prisma'

const include = {
  listing: true,
  author: true,
}

export const RequestModel = {
  findMany: () => prisma.request.findMany({
    include
  }),
  findById: (requestId: string) => prisma.request.findFirst({
    where: {
      id: requestId,
    },
    include
  }),
  findByListingId: (listingId: string) => prisma.request.findMany({
    where: {
      listingId: listingId,
    }
  }),
  create: (data: { unit: number, listingId: string, authorId: string }) => prisma.request.create({ data }),
  update: (requestId: string, data: { unit?: number, status?: string, listingId?: string, authorId?: string }) => prisma.request.update({
    where: {
      id: requestId,
    },
    data
  }),
  delete: (requestId: string) => prisma.request.delete({ where: { id: requestId }})
}
