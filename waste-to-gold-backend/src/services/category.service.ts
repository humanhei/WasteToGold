import { CategoryModel } from '../models/category.model'
import { Category, Prisma } from '@prisma/client'

export const CategoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    return CategoryModel.findMany()
  },

  getCategoryById: async (categoryId: string): Promise<Category|null> => {
    return CategoryModel.findById(categoryId)
  }, 

  createCategory: async (name_en: string, name_zh: string): Promise<Category> => {
    const category = await CategoryModel.create({ name_en, name_zh })
    return category
  },

  updateCategory: async (categoryId:string, name_en: string, name_zh: string): Promise<Category> => {
    const category = await CategoryModel.update(categoryId, { name_en, name_zh })
    return category
  },

  deleteCategory: async (categoryId:string): Promise<Category> => {
    const category = await CategoryModel.delete(categoryId)
    return category
  },
}
