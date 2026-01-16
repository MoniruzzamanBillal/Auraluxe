import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/CreateCategoryDto.dto';
import { UpdateCategoryDto } from './dto/UpdateCategoryDto.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  //

  // ! for adding new category
  async addCategory(payload: CreateCategoryDto) {
    const result = await this.prisma.category.create({
      data: payload,
    });

    return result;
  }

  // ! for getting all categories
  async getAllCategories() {
    const result = await this.prisma.category.findMany({
      where: { isDeleted: false, status: true },
      orderBy: { createdAt: 'desc' },
    });

    return result;
  }

  // ! for getting all categories (including inactive - admin only)
  async getAllCategoriesAdmin() {
    const result = await this.prisma.category.findMany({
      where: { isDeleted: false, status: false },
      orderBy: { createdAt: 'desc' },
    });

    return result;
  }

  // ! for updating category
  async updateCategory(id: string, payload: UpdateCategoryDto) {
    // Check if category exists
    const category = await this.prisma.category.findUnique({
      where: { id, isDeleted: false, status: true },
    });

    if (!category) {
      throw new NotFoundException("This category doesn't exist!");
    }

    // If name is being updated, check for uniqueness
    if (payload.name && payload.name !== category.name) {
      const existingCategory = await this.prisma.category.findUnique({
        where: { name: payload.name },
      });

      if (existingCategory && existingCategory.id !== id) {
        throw new NotFoundException('Category with this name already exists');
      }
    }

    const result = await this.prisma.category.update({
      where: { id },
      data: { ...payload },
    });

    return result;
  }

  // ! for deleting category (soft delete)
  async deleteCategory(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id, isDeleted: false, status: true },
    });

    if (!category) {
      throw new NotFoundException("This category doesn't exist!");
    }

    // Check if category has active products
    const activeProducts = await this.prisma.product.count({
      where: {
        categoryId: id,
        isDeleted: false,
      },
    });

    if (activeProducts > 0) {
      throw new NotFoundException(
        'Cannot delete category. It has active products. Please delete or reassign products first.',
      );
    }

    // Soft delete the category
    await this.prisma.category.update({
      where: { id },
      data: {
        isDeleted: true,
        status: false,
      },
    });

    return { message: 'Category deleted successfully' };
  }

  //
}
