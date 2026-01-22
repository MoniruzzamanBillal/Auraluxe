import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  //

  // ! for adding new brand
  async addBrand(payload: CreateBrandDto, imageUrl: string) {
    // Check if brand type exists and is active
    const brandType = await this.prisma.brandType.findUnique({
      where: {
        id: payload.brandTypeId,
        isDeleted: false,
        status: true,
      },
    });

    if (!brandType) {
      throw new NotFoundException('Brand type not found or inactive!');
    }

    // Check if brand with same name already exists
    const existingBrand = await this.prisma.brand.findUnique({
      where: { name: payload.name },
    });

    if (existingBrand && !existingBrand.isDeleted) {
      throw new NotFoundException('Brand with this name already exists!');
    }

    // If exists but deleted, restore it
    if (existingBrand && existingBrand.isDeleted) {
      const result = await this.prisma.brand.update({
        where: { id: existingBrand.id },
        data: {
          ...payload,
          isDeleted: false,
          status: true,
        },
      });
      return result;
    }

    // Create new brand
    const result = await this.prisma.brand.create({
      data: { ...payload, logo: imageUrl },
      include: {
        brandType: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    return result;
  }

  // ! for getting all brands (active only)
  async getAllBrands() {
    const result = await this.prisma.brand.findMany({
      where: {
        isDeleted: false,
        status: true,
      },
      include: {
        brandType: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return result;
  }

  // ! for getting single brand
  async getSingleBrand(id: string) {
    const result = await this.prisma.brand.findUnique({
      where: {
        id,
        isDeleted: false,
        status: true,
      },
      include: {
        brandType: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    if (!result) {
      throw new NotFoundException("This brand doesn't exist!");
    }

    return result;
  }

  // ! for updating brand
  async updateBrand(id: string, payload: UpdateBrandDto, imageUrl?: string) {
    const updatedPayload = {
      ...payload,
    };

    if (imageUrl) {
      updatedPayload.logo = imageUrl;
    }
    // Check if brand exists
    const brand = await this.prisma.brand.findUnique({
      where: { id, isDeleted: false },
    });

    if (!brand) {
      throw new NotFoundException("This brand doesn't exist!");
    }

    // If brandTypeId is being updated, check if it exists
    if (payload.brandTypeId && payload.brandTypeId !== brand.brandTypeId) {
      const brandType = await this.prisma.brandType.findUnique({
        where: {
          id: payload.brandTypeId,
          isDeleted: false,
          status: true,
        },
      });

      if (!brandType) {
        throw new NotFoundException('Brand type not found or inactive!');
      }
    }

    // If name is being updated, check for uniqueness
    if (payload?.name && payload.name !== brand.name) {
      const existingBrand = await this.prisma.brand.findUnique({
        where: { name: payload.name },
      });

      if (existingBrand && existingBrand.id !== id) {
        throw new NotFoundException('Brand with this name already exists!');
      }
    }

    const result = await this.prisma.brand.update({
      where: { id },
      data: { ...updatedPayload },
      include: {
        brandType: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    return result;
  }

  // ! for deleting brand (soft delete)
  async deleteBrand(id: string) {
    const brand = await this.prisma.brand.findUnique({
      where: { id, isDeleted: false },
    });

    if (!brand) {
      throw new NotFoundException("This brand doesn't exist!");
    }

    // Check if brand has active products (if you add products later)
    // const activeProducts = await this.prisma.product.count({
    //   where: {
    //     brandId: id,
    //     isDeleted: false
    //   },
    // });

    // if (activeProducts > 0) {
    //   throw new NotFoundException(
    //     'Cannot delete brand. It has active products. Please delete or reassign products first.'
    //   );
    // }

    // Soft delete the brand
    await this.prisma.brand.update({
      where: { id },
      data: {
        isDeleted: true,
        status: false,
      },
    });

    return { message: 'Brand deleted successfully' };
  }

  //
}
