import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes'
import categoryRoutes from './routes/category.routes'
import subCategoryRoutes from './routes/subCategory.routes'

dotenv.config()

const app = express()
app.use(express.json())

// Routes
app.use('/users', userRoutes)
app.use('/categories', categoryRoutes)
app.use('/subCategories', subCategoryRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})