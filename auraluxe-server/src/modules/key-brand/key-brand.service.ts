import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateKeyBrandDto } from './dto/create-key-brand.dto';
import { UpdateKeyBrandDto } from './dto/update-key-brand.dto';

@Injectable()
export class KeyBrandService {
  constructor(private prisma: PrismaService) {}

  //

  // ! for adding new key brand
  async addKeyBrand(payload: CreateKeyBrandDto, imageUrl: string) {
    // Check if key brand with same name already exists
    const existingKeyBrand = await this.prisma.keyBrands.findUnique({
      where: { name: payload.name },
    });

    if (existingKeyBrand && !existingKeyBrand.isDeleted) {
      throw new NotFoundException('Key brand with this name already exists!');
    }

    // If exists but deleted, restore it
    if (existingKeyBrand && existingKeyBrand.isDeleted) {
      const result = await this.prisma.keyBrands.update({
        where: { id: existingKeyBrand.id },
        data: {
          ...payload,
          isDeleted: false,
        },
      });
      return result;
    }

    // Create new key brand
    const result = await this.prisma.keyBrands.create({
      data: { ...payload, logo: imageUrl },
    });

    return result;
  }

  // ! for getting all key brands (not deleted only)
  async getAllKeyBrands() {
    const result = await this.prisma.keyBrands.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: { createdAt: 'desc' },
    });

    return result;
  }

  // ! for getting single key brand
  async getSingleKeyBrand(id: string) {
    const result = await this.prisma.keyBrands.findUnique({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!result) {
      throw new NotFoundException("This key brand doesn't exist!");
    }

    return result;
  }

  // ! for updating key brand
  async updateKeyBrand(
    id: string,
    payload: UpdateKeyBrandDto,
    imageUrl?: string,
  ) {
    // Check if key brand exists
    const keyBrand = await this.prisma.keyBrands.findUnique({
      where: { id, isDeleted: false },
    });

    if (!keyBrand) {
      throw new NotFoundException("This key brand doesn't exist!");
    }

    // If name is being updated, check for uniqueness
    if (payload.name && payload.name !== keyBrand.name) {
      const existingKeyBrand = await this.prisma.keyBrands.findUnique({
        where: { name: payload.name },
      });

      if (
        existingKeyBrand &&
        existingKeyBrand.id !== id &&
        !existingKeyBrand.isDeleted
      ) {
        throw new NotFoundException('Key brand with this name already exists!');
      }
    }

    const updateData = { ...payload };
    if (imageUrl) {
      updateData.logo = imageUrl;
    }

    const result = await this.prisma.keyBrands.update({
      where: { id },
      data: { ...updateData },
    });

    return result;
  }

  // ! for deleting key brand (soft delete)
  async deleteKeyBrand(id: string) {
    const keyBrand = await this.prisma.keyBrands.findUnique({
      where: { id, isDeleted: false },
    });

    if (!keyBrand) {
      throw new NotFoundException("This key brand doesn't exist!");
    }

    // Soft delete the key brand
    await this.prisma.keyBrands.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    return { message: 'Key brand deleted successfully' };
  }

  //
}
