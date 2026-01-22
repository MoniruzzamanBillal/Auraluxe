import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OurFeaturedProductService {
  constructor(private prisma: PrismaService) {}

  // ! create
  async addOurFeaturedProduct(imgUrl: string) {
    return this.prisma.ourFeaturedProduct.create({
      data: {
        imageUrl: imgUrl,
      },
    });
  }

  // ! get all
  async getAllOurFeaturedProduct() {
    return this.prisma.ourFeaturedProduct.findMany({
      where: { isDeleted: false, status: true },
    });
  }

  // ! update
  async updateOurFeaturedProduct(
    id: string,
    imageUrl?: string,
    order?: number,
  ) {
    const data = await this.prisma.ourFeaturedProduct.findFirst({
      where: { id, isDeleted: false, status: true },
    });

    if (!data) {
      throw new NotFoundException("This featured product doesn't exist");
    }

    return this.prisma.ourFeaturedProduct.update({
      where: { id },
      data: {
        ...(imageUrl && { imageUrl }),
        ...(order && { order }),
      },
    });
  }

  // ! delete (soft delete + reorder)
  async deleteOurFeaturedProduct(id: string) {
    const data = await this.prisma.ourFeaturedProduct.findFirst({
      where: { id, isDeleted: false, status: true },
    });

    if (!data) {
      throw new NotFoundException("This featured product doesn't exist");
    }

    await this.prisma.ourFeaturedProduct.update({
      where: { id },
      data: { isDeleted: true, status: false },
    });
  }
}
