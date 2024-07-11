import express from 'express'
import { SubCategoryController } from '../controllers/subCategory.controller'

const router = express.Router()

router.get('/', SubCategoryController.getAllSubCategories)
router.post('/', SubCategoryController.createSubCategory)

export default router