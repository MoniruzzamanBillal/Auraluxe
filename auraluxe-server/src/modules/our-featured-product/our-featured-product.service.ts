import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OurFeaturedProductService {
  constructor(private prisma: PrismaService) {}

  // ! create
  async addOurFeaturedProduct(imgUrl: string) {
    const lastItem = await this.prisma.ourFeaturedProduct.findFirst({
      where: { isDeleted: false },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const nextOrder = lastItem ? lastItem.order + 1 : 1;

    return this.prisma.ourFeaturedProduct.create({
      data: {
        imageUrl: imgUrl,
        order: nextOrder,
      },
    });
  }

  // ! get all
  async getAllOurFeaturedProduct() {
    return this.prisma.ourFeaturedProduct.findMany({
      where: { isDeleted: false, status: true },
      orderBy: { order: 'asc' },
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

    await this.prisma.$transaction(async (txn) => {
      const deleted = await txn.ourFeaturedProduct.update({
        where: { id },
        data: { isDeleted: true, status: false },
      });

      await txn.ourFeaturedProduct.updateMany({
        where: {
          order: { gt: deleted.order },
          isDeleted: false,
        },
        data: { order: { decrement: 1 } },
      });
    });
  }
}
