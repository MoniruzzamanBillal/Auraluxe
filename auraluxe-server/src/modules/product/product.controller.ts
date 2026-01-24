import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserRole } from 'src/generated/prisma/enums';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // ! for creating product
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  async addProduct(
    @Body() payload: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Image is required');
    }

    const imageUrl = `${process.env.APP_URL}/uploads/${file?.filename}`;

    const result = await this.productService.addProduct(payload, imageUrl);

    return {
      success: true,
      status: HttpStatus.CREATED,
      message: 'Product created successfully!!!',
      data: result,
    };
  }

  // ! for getting all product
  @Get('')
  async getAllProduct(
    @Query('categoryId') categoryId?: string,
    @Query('brandId') brandId?: string,

    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const result = await this.productService.getAllProduct({
      categoryId,
      brandId,

      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 12,
    });

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Products retrieved successfully!',
      data: result.products,
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    };
  }

  // ! for getting single product
  @Get(':id')
  async getSingleProduct(@Param('id') id: string) {
    const result = await this.productService.getSingleProduct(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Product retrived successfully!!!',
      data: result,
    };
  }

  // ! for getting single product
  @Get('related/:id')
  async getSameCategoryProducts(@Param('id') id: string) {
    const result = await this.productService.getSameCategoryProducts(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Related Product retrived successfully!!!',
      data: result,
    };
  }

  // ! for updating product (Admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  async updateProduct(
    @Param('id') id: string,
    @Body() payload: updateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let imageUrl: string | undefined;

    if (file) {
      imageUrl = `${process.env.APP_URL}/uploads/${file?.filename}`;
    }

    const result = await this.productService.updateProduct(
      id,
      payload,
      imageUrl,
    );

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Product updated successfully!',
      data: result,
    };
  }

  // ! for deleting product (Admin only - Soft Delete)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    await this.productService.deleteProduct(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Product deleted successfully!',
    };
  }

  //
}
