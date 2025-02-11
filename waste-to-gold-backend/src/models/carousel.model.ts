import prisma from '../prisma'

export interface carouselData {
  id: string,
  fileName: string,
  originalName: string,
  s3Url: string,
  mimeType: string,
  listingId: string,
  status: string,
  order?: number,
}

export interface carouselCreateData {
    fileName: string,
    originalName: string,
    s3Url: string,
    mimeType: string,
    status: string,
    order?: number,
}


export async function createCarousel(data: carouselCreateData) {
  return prisma.carousel.create({ data });
}

export async function getAllCarousels() {
  return prisma.carousel.findMany({ where: { status: 'ACTIVE' } });
}

export async function deleteCarousel(id: string) {
  return prisma.carousel.delete({ where: { id } });
}

export async function getCarouselById(id: string) {
  return prisma.carousel.findUnique({ where: { id, status: 'ACTIVE' } });
}