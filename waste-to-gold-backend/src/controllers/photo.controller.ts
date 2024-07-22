import { Request, Response } from 'express';
import * as photoModel from '../models/photo.model';
import * as s3Service from '../services/s3.service';

export async function uploadPhoto(req: Request, res: Response) {
  try {
    const files = req.files as Array<Express.Multer.File>;
    const { listingId } = req.params;
    const photos = []
    
    for (const file of files) {
      // Upload to S3
      const s3Result = await s3Service.uploadToS3(file);

      // Store metadata in database
      const photo = await photoModel.createPhoto({
        fileName: s3Result.Key,
        originalName: file.originalname,
        s3Url: s3Result.Location,
        mimeType: file.mimetype,
        listingId: listingId,
      });

      photos.push(photo);
    }

    res.json({ message: 'Photo uploaded successfully', data: photos });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'Failed to upload photo' });
  }
}

export async function getAllPhotos(req: Request, res: Response) {
  try {
    const photos = await photoModel.getAllPhotos();
    res.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
}

export async function getPhotoById(req: Request, res: Response) {
  try {
    const photo = await photoModel.getPhotoById(parseInt(req.params.id));
    if (photo) {
      res.json(photo);
    } else {
      res.status(404).json({ error: 'Photo not found' });
    }
  } catch (error) {
    console.error('Error fetching photo:', error);
    res.status(500).json({ error: 'Failed to fetch photo' });
  }
}