import { Category } from '@prisma/client'
import prisma from '../prisma'

export interface SubCategory {
  id: string,
  name_en: string,
  name_zh: string,
  category: Category
}

export const SubCategoryModel = {
  findMany: () => prisma.subCategory.findMany({
    select: {
      id: true,
      name_en: true,
      name_zh: true,
      category: true,
    }
  }),
  create: (data: { name_en: string, name_zh: string, categoryId: string }) => prisma.subCategory.create({ data }),
}
