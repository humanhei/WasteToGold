import { Request, Response } from 'express';
import * as carouselModel from '../models/carousel.model';
import * as s3Service from '../services/s3.service';

export async function uploadCarousel(req: Request, res: Response) {
  try {
    const files = req.files as Array<Express.Multer.File>;
    const carousels = []
    
    for (const file of files) {
      // Upload to S3
      const s3Result = await s3Service.uploadToS3(file);

      // Store metadata in database
      const carousel = await carouselModel.createCarousel({
        fileName: s3Result.Key,
        originalName: file.originalname,
        s3Url: s3Result.Location,
        mimeType: file.mimetype,
        status: "ACTIVE",
      });

      carousels.push(carousel);
    }

    res.json({ message: 'Carousel uploaded successfully', data: carousels });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'Failed to upload photo' });
  }
}

export async function getAllCarosels(req: Request, res: Response) {
  try {
    const carousel = await carouselModel.getAllCarousels();
    res.json(carousel);
  } catch (error) {
    console.error('Error fetching carousels:', error);
    res.status(500).json({ error: 'Failed to fetch carousels' });
  }
}

export async function getCarouselById(req: Request, res: Response) {
  try {
    const photo = await carouselModel.getCarouselById(req.params.id);
    if (photo) {
      res.json(photo);
    } else {
      res.status(404).json({ error: 'Carousel not found' });
    }
  } catch (error) {
    console.error('Error fetching photo:', error);
    res.status(500).json({ error: 'Failed to fetch photo' });
  }
}