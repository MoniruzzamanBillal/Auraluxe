import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateHomeOurProductDto } from './dto/create-home-our-product.dto';
import { UpdateHomeOurProductDto } from './dto/update-home-our-product.dto';

@Injectable()
export class HomeOurProductService {
  constructor(private prisma: PrismaService) {}

  // ! create
  async addHomeOurProduct(payload: CreateHomeOurProductDto, imgUrl: string) {
    return this.prisma.homeOurProduct.create({
      data: {
        ...payload,
        imageUrl: imgUrl,
      },
    });
  }

  // ! get all
  async getAllHomeOurProduct() {
    return this.prisma.homeOurProduct.findMany({
      where: { isDeleted: false, status: true },
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

    await this.prisma.homeOurProduct.update({
      where: { id },
      data: { isDeleted: true, status: false },
    });
  }
}
