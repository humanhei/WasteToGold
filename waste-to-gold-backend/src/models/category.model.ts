import { Request, Sell, SubCategory } from '@prisma/client'
import prisma from '../prisma'

export interface Category {
  id: string,
  name_en: string,
  name_zh: string,
  sells: Sell[]
  requests: Request[],
  subCategories: SubCategory[]
}

export const CategoryModel = {
  findMany: () => prisma.category.findMany({
    select: {
      id: true,
      name_en: true,
      name_zh: true,
      sells: true,
      requests: true,
      subCategories: true,
    }
  }),
  create: (data: { name_en: string, name_zh: string }) => prisma.category.create({ data }),
}
