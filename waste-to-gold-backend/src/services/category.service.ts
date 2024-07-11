import { CategoryModel, Category } from '../models/category.model'
import { Prisma } from '@prisma/client'

export const CategoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    return CategoryModel.findMany()
  },

  createCategory: async (name_en: string, name_zh: string): Promise<Prisma.CategoryUncheckedCreateInput> => {
    const category = await CategoryModel.create({ name_en, name_zh })
    return category
  },
}
