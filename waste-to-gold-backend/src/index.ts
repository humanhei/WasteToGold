import express from 'express'
import dotenv from 'dotenv'
const { PrismaClient } = require('@prisma/client');
import userRoutes from './routes/user.routes'
import categoryRoutes from './routes/category.routes'
import subCategoryRoutes from './routes/subCategory.routes'
import listingRoutes from './routes/listing.routes'
import photoRoutes from './routes/photo.routes'
import reviewRoutes from './routes/review.routes'
import requestRoutes from './routes/requests.routes'

dotenv.config()
const prisma = new PrismaClient();

const app = express()
app.use(express.json())


// Routes
app.use('/users', userRoutes)
app.use('/categories', categoryRoutes)
app.use('/subCategories', subCategoryRoutes)
app.use('/photos', photoRoutes)
app.use('/listings', listingRoutes)
app.use('/reviews', reviewRoutes)
app.use('/requests', requestRoutes)

const PORT = process.env.PORT || 3000

async function main() {
  try {
    await prisma.$connect();
    console.log('Connected to the database');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

main();