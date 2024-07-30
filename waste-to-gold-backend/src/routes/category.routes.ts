import express from 'express'
import { CategoryController } from '../controllers/category.controller'

const router = express.Router()

router.get('/', CategoryController.getAllCategories)
router.post('/', CategoryController.createCategory)
router.post('/:categoryId', CategoryController.updateCategory)
router.delete('/:categoryId', CategoryController.deleteCategory)

export default router
