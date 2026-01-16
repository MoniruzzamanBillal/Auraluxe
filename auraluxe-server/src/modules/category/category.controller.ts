import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from 'src/generated/prisma/enums';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/CreateCategoryDto.dto';
import { UpdateCategoryDto } from './dto/UpdateCategoryDto.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  //
  // ! for creating new category
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Post('')
  async addCategory(@Body() payload: CreateCategoryDto) {
    const result = await this.categoryService.addCategory(payload);

    return {
      success: true,
      status: HttpStatus.CREATED,
      message: 'Category created successfully!',
      data: result,
    };
  }

  // ! for getting all categories
  @Get('')
  async getAllCategories() {
    const result = await this.categoryService.getAllCategories();

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Categories retrieved successfully!',
      data: result,
    };
  }

  // ! for getting all categories (including inactive - admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Get('admin/all')
  async getAllCategoriesAdmin() {
    const result = await this.categoryService.getAllCategoriesAdmin();

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'All categories retrieved successfully!',
      data: result,
    };
  }

  // ! for updating category
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() payload: UpdateCategoryDto,
  ) {
    const result = await this.categoryService.updateCategory(id, payload);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Category updated successfully!',
      data: result,
    };
  }

  // ! for deleting category
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    await this.categoryService.deleteCategory(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Category deleted successfully!',
    };
  }

  //
}
