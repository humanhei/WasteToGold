import { Request, Response } from 'express'
import { CategoryService } from '../services/category.service'

export const CategoryController = {
  getAllCategories: async (req: Request, res: Response) => {
    try {
      const categories = await CategoryService.getAllCategories()
      res.json(categories)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve categories' })
    }
  },

  createCategory: async (req: Request, res: Response) => {
    const { name_en, name_zh } = req.body
    try {
      const category = await CategoryService.createCategory(name_en, name_zh)
      res.status(201).json(category)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  updateCategory: async (req: Request, res: Response) => {
    const { categoryId, name_en, name_zh } = req.body
    try {
      const category = await CategoryService.updateCategory(categoryId, name_en, name_zh)
      res.status(201).json(category)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  deleteCategory: async (req: Request, res: Response) => {
    const { categoryId } = req.params
    try {
      const category = await CategoryService.deleteCategory(categoryId)
      res.status(201).json(category)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },
}