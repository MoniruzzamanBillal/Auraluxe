import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialService {
  constructor(private prisma: PrismaService) {}

  //

  // ! for adding new material
  async addMaterial(payload: CreateMaterialDto) {
    // Check if material with same name already exists
    const existingMaterial = await this.prisma.material.findUnique({
      where: { name: payload.name },
    });

    if (existingMaterial && !existingMaterial.isDeleted) {
      throw new NotFoundException('Material with this name already exists!');
    }

    // If exists but deleted, restore it
    if (existingMaterial && existingMaterial.isDeleted) {
      const result = await this.prisma.material.update({
        where: { id: existingMaterial.id },
        data: {
          ...payload,
          isDeleted: false,
        },
      });
      return result;
    }

    // Create new material
    const result = await this.prisma.material.create({
      data: payload,
    });

    return result;
  }

  // ! for getting all active materials
  async getAllMaterials() {
    const result = await this.prisma.material.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: { createdAt: 'desc' },
    });

    return result;
  }

  // ! for getting single material
  async getSingleMaterial(id: string) {
    const result = await this.prisma.material.findUnique({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!result) {
      throw new NotFoundException("This material doesn't exist!");
    }

    return result;
  }

  // ! for updating material
  async updateMaterial(id: string, payload: UpdateMaterialDto) {
    // Check if material exists
    const material = await this.prisma.material.findUnique({
      where: { id, isDeleted: false },
    });

    if (!material) {
      throw new NotFoundException("This material doesn't exist!");
    }

    // If name is being updated, check for uniqueness
    if (payload.name && payload.name !== material.name) {
      const existingMaterial = await this.prisma.material.findUnique({
        where: { name: payload.name },
      });

      if (existingMaterial && existingMaterial.id !== id) {
        throw new NotFoundException('Material with this name already exists!');
      }
    }

    const result = await this.prisma.material.update({
      where: { id },
      data: { ...payload },
    });

    return result;
  }

  // ! for deleting material (soft delete)
  async deleteMaterial(id: string) {
    const material = await this.prisma.material.findUnique({
      where: { id, isDeleted: false },
    });

    if (!material) {
      throw new NotFoundException("This material doesn't exist!");
    }

    // Check if material is used in any projects
    const projectCount = await this.prisma.project.count({
      where: {
        materialId: id,
        isDeleted: false,
      },
    });

    if (projectCount > 0) {
      throw new NotFoundException(
        'Cannot delete material. It is being used in projects. Please update or delete those projects first.',
      );
    }

    // Soft delete the material
    await this.prisma.material.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    return { message: 'Material deleted successfully' };
  }

  //
}
