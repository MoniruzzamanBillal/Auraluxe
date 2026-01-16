import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateHomeOurProductDto } from './dto/create-home-our-product.dto';
import { UpdateHomeOurProductDto } from './dto/update-home-our-product.dto';

@Injectable()
export class HomeOurProductService {
  constructor(private prisma: PrismaService) {}

  // ! create
  async addHomeOurProduct(payload: CreateHomeOurProductDto, imgUrl: string) {
    const lastItem = await this.prisma.homeOurProduct.findFirst({
      where: { isDeleted: false },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const nextOrder = lastItem ? lastItem.order + 1 : 1;

    return this.prisma.homeOurProduct.create({
      data: {
        ...payload,
        imageUrl: imgUrl,
        order: nextOrder,
      },
    });
  }

  // ! get all
  async getAllHomeOurProduct() {
    return this.prisma.homeOurProduct.findMany({
      where: { isDeleted: false, status: true },
      orderBy: { order: 'asc' },
    });
  }

  // ! update
  async updateHomeOurProduct(
    payload: UpdateHomeOurProductDto,
    id: string,
    imageUrl?: string,
  ) {
    const data = await this.prisma.homeOurProduct.findFirst({
      where: { id, isDeleted: false, status: true },
    });

    if (!data) {
      throw new NotFoundException("This product doesn't exist");
    }

    return this.prisma.homeOurProduct.update({
      where: { id },
      data: {
        ...payload,
        ...(imageUrl && { imageUrl }),
      },
    });
  }

  // ! delete (soft delete + reorder)
  async deleteHomeOurProduct(id: string) {
    const data = await this.prisma.homeOurProduct.findFirst({
      where: { id, isDeleted: false, status: true },
    });

    if (!data) {
      throw new NotFoundException("This product doesn't exist");
    }

    await this.prisma.$transaction(async (txn) => {
      const deleted = await txn.homeOurProduct.update({
        where: { id },
        data: { isDeleted: true, status: false },
      });

      await txn.homeOurProduct.updateMany({
        where: {
          order: { gt: deleted.order },
          isDeleted: false,
        },
        data: { order: { decrement: 1 } },
      });
    });
  }
}
