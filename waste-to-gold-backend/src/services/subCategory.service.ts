import { SubCategoryModel, SubCategory } from '../models/subCategory.model'
import { Prisma } from '@prisma/client'

export const SubCategoryService = {
  getAllSubCategories: async (): Promise<SubCategory[]> => {
    return SubCategoryModel.findMany()
  },

  createSubCategory: async (name_en: string, name_zh: string, categoryId: string): Promise<Prisma.CategoryUncheckedCreateInput> => {
    const category = await SubCategoryModel.create({ name_en, name_zh, categoryId })
    return category
  },
}
