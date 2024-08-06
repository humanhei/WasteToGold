import { Review } from '@prisma/client'
import prisma from '../prisma'

const include = {
  listing: true,
  author: true,
}

export const ReviewModel = {
  findMany: () => prisma.review.findMany({
    include
  }),
  findById: (reviewId: string) => prisma.review.findFirst({
    where: {
      id: reviewId,
    },
    include
  }),
  findByListingId: (listingId: string) => prisma.review.findFirst({
    where: {
      listingId: listingId,
    },
    include
  }),
  create: (data: { rating: number, review: string, listingId: string, authorId: string }) => prisma.review.create({ data }),
  update: (reviewId: string, data: { rating: number, review: string, listingId: string, authorId: string }) => prisma.review.update({
    where: {
      id: reviewId,
    },
    data
  }),
  delete: (reviewId: string) => prisma.review.delete({ where: { id: reviewId }})
}
