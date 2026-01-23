import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateHomeOurFeaturedDto } from './dto/create-home-our-featured.dto';
import { UpdateHomeOurFeaturedDto } from './dto/update-home-our-featured.dto';

@Injectable()
export class HomeOurFeaturedService {
  constructor(private prisma: PrismaService) {}

  // ! create
  async addHomeOurFeatured(payload: CreateHomeOurFeaturedDto, imgUrl: string) {
    return this.prisma.homeOurFeatured.create({
      data: {
        ...payload,
        imageUrl: imgUrl,
      },
    });
  }

  // ! get all
  async getAllHomeOurFeatured() {
    return this.prisma.homeOurFeatured.findMany({
      where: { isDeleted: false },
    });
  }

  // ! update
  async updateHomeOurFeatured(
    payload: UpdateHomeOurFeaturedDto,
    id: string,
    imageUrl?: string,
  ) {
    const data = await this.prisma.homeOurFeatured.findFirst({
      where: { id, isDeleted: false },
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
      where: { id, isDeleted: false },
    });

    if (!data) {
      throw new NotFoundException("This featured item doesn't exist");
    }

    await this.prisma.homeOurFeatured.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
