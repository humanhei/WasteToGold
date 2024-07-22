import express from 'express';
import multer from 'multer';
import * as photoController from '../controllers/photo.controller';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload/:listingId', upload.array('photo'), photoController.uploadPhoto);
router.get('/', photoController.getAllPhotos);
router.get('/:id', photoController.getPhotoById);

export default router;