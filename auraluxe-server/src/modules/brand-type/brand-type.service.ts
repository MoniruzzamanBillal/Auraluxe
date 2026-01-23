import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBrandTypeDto } from './dto/CreateBrandTypeDto';
import { UpdateBrandTypeDto } from './dto/UpdateBrandTypeDto';

@Injectable()
export class BrandTypeService {
  constructor(private prisma: PrismaService) {}

  //

  // ! for adding new brand type
  async addBrandType(payload: CreateBrandTypeDto) {
    const result = this.prisma.brandType.create({ data: payload });

    return result;
  }

  // ! for getting all brand type
  async getAllBrandTypes() {
    const result = await this.prisma.brandType.findMany({
      where: { isDeleted: false },
    });

    return result;
  }

  // ! for getting single brandtype
  async getSingleBrandType(id: string) {
    const result = await this.prisma.brandType.findUnique({
      where: { id, isDeleted: false },
    });

    if (!result) {
      throw new NotFoundException("This brand type don't exist!!!");
    }

    return result;
  }

  // ! for updating brandType
  async updateBrandType(id: string, payload: UpdateBrandTypeDto) {
    const data = await this.prisma.brandType.findUnique({
      where: { id, isDeleted: false },
    });

    if (!data) {
      throw new NotFoundException("This brand type don't exist!!!");
    }

    const result = await this.prisma.brandType.update({
      where: { id },
      data: { ...payload },
    });

    return result;
  }
  // ! for deleting brandtype
  async deleteBrandType(id: string) {
    const data = await this.prisma.brandType.findUnique({
      where: { id, isDeleted: false },
    });

    if (!data) {
      throw new NotFoundException("This brand type don't exist!!!");
    }

    // Check if brand type has active brands
    const activeBrands = await this.prisma.brand.count({
      where: {
        brandTypeId: id,
        isDeleted: false,
      },
    });

    if (activeBrands > 0) {
      throw new NotFoundException(
        'Cannot delete brand type. It has active brands. Please delete or reassign brands first.',
      );
    }

    await this.prisma.brandType.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  //
}
