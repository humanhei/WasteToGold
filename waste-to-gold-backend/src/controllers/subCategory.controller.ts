import { Request, Response } from 'express'
import { SubCategoryService } from '../services/subCategory.service'

export const SubCategoryController = {
  getAllSubCategories: async (req: Request, res: Response) => {
    try {
      const subCategories = await SubCategoryService.getAllSubCategories()
      res.json(subCategories)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve categories' })
    }
  },

  createSubCategory: async (req: Request, res: Response) => {
    const { name_en, name_zh, categoryId } = req.body
    try {
      const subCategory = await SubCategoryService.createSubCategory(name_en, name_zh, categoryId)
      res.status(201).json(subCategory)
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ errors: [{ message: error.message }] });
        }
    }
  },
}