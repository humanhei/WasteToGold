import express from 'express';
import multer from 'multer';
import * as carouselController from '../controllers/carousel.controller';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.array('photo'), carouselController.uploadCarousel);
router.get('/', carouselController.getAllCarosels);
router.get('/:id', carouselController.getCarouselById);
router.post('/update/:id', carouselController.updateCarousel);
router.delete('/:id', carouselController.deleteCarousel);

export default router;
