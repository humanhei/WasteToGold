import { Listing, SubCategory } from '@prisma/client'
import prisma from '../prisma'

export interface Category {
  id: string,
  name_en: string,
  name_zh: string,
  listings: Listing[]
  requests: Request[],
  subCategories: SubCategory[],
  status: string,
}

export const CategoryModel = {
  findMany: () => prisma.category.findMany({
    include: {
      listings: true,
      subCategories: true,
    }
  }),
  create: (data: { name_en: string, name_zh: string }) => prisma.category.create({ data }),
  update: (categoryId: string, data: { name_en: string, name_zh: string }) => prisma.category.update({
    where: {
      id: categoryId,
    },
    data
  }),
  delete: (categoryId: string) => prisma.category.delete({ where: { id: categoryId }})
}
