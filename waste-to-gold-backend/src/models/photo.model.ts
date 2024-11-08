import prisma from '../prisma'
import { PhotoData } from '../types';

export async function createPhoto(data: PhotoData) {
  return prisma.photo.create({ data });
}

export async function getAllPhotos() {
  return prisma.photo.findMany();
}

export async function getAllPhotosByListingId(listingId: string) {
  return prisma.photo.findMany({ where: { listingId }});
}

export async function deletePhoto(id: number) {
  return prisma.photo.delete({ where: { id } });
}

export async function getPhotoById(id: number) {
  return prisma.photo.findUnique({ where: { id } });
}