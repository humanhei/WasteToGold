import prisma from '../prisma'
import { PhotoData } from '../types';

export async function createPhoto(data: PhotoData) {
  return prisma.photo.create({ data });
}

export async function getAllPhotos() {
  return prisma.photo.findMany();
}

export async function getPhotoById(id: number) {
  return prisma.photo.findUnique({ where: { id } });
}