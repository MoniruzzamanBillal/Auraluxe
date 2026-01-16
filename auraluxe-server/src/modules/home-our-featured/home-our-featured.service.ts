import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateHomeOurFeaturedDto } from './dto/create-home-our-featured.dto';
import { UpdateHomeOurFeaturedDto } from './dto/update-home-our-featured.dto';

@Injectable()
export class HomeOurFeaturedService {
  constructor(private prisma: PrismaService) {}

  // ! create
  async addHomeOurFeatured(payload: CreateHomeOurFeaturedDto, imgUrl: string) {
    const lastItem = await this.prisma.homeOurFeatured.findFirst({
      where: { isDeleted: false },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const nextOrder = lastItem ? lastItem.order + 1 : 1;

    return this.prisma.homeOurFeatured.create({
      data: {
        ...payload,
        imageUrl: imgUrl,
        order: nextOrder,
      },
    });
  }

  // ! get all
  async getAllHomeOurFeatured() {
    return this.prisma.homeOurFeatured.findMany({
      where: { isDeleted: false, status: true },
      orderBy: { order: 'asc' },
    });
  }

  // ! update
  async updateHomeOurFeatured(
    payload: UpdateHomeOurFeaturedDto,
    id: string,
    imageUrl?: string,
  ) {
    const data = await this.prisma.homeOurFeatured.findFirst({
      where: { id, isDeleted: false, status: true },
    });

    if (!data) {
      throw new NotFoundException("This featured item doesn't exist");
    }

    return this.prisma.homeOurFeatured.update({
      where: { id },
      data: {
        ...payload,
        ...(imageUrl && { imageUrl }),
      },
    });
  }

  // ! delete (soft delete + reorder)
  async deleteHomeOurFeatured(id: string) {
    const data = await this.prisma.homeOurFeatured.findFirst({
      where: { id, isDeleted: false, status: true },
    });

    if (!data) {
      throw new NotFoundException("This featured item doesn't exist");
    }

    await this.prisma.$transaction(async (txn) => {
      const deleted = await txn.homeOurFeatured.update({
        where: { id },
        data: { isDeleted: true, status: false },
      });

      await txn.homeOurFeatured.updateMany({
        where: {
          order: { gt: deleted.order },
          isDeleted: false,
        },
        data: { order: { decrement: 1 } },
      });
    });
  }
}
