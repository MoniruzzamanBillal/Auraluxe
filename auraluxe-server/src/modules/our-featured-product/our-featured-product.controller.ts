import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
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
import { OurFeaturedProductService } from './our-featured-product.service';

@Controller('our-featured-product')
export class OurFeaturedProductController {
  constructor(private service: OurFeaturedProductService) {}

  // ! create
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
  async add(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const imageUrl = `${process.env.APP_URL}/uploads/${file.filename}`;

    const result = await this.service.addOurFeaturedProduct(imageUrl);

    return {
      success: true,
      status: HttpStatus.CREATED,
      message: 'Our Featured Product created successfully',
      data: result,
    };
  }

  // ! get all
  @Get('')
  async getAll() {
    const result = await this.service.getAllOurFeaturedProduct();
    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Our Featured Product retrieved successfully',
      data: result,
    };
  }

  // ! update
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
  async update(
    @Param('id') id: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const imageUrl = file
      ? `${process.env.APP_URL}/uploads/${file.filename}`
      : undefined;

    const result = await this.service.updateOurFeaturedProduct(id, imageUrl);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Our Featured Product updated successfully',
      data: result,
    };
  }

  // ! delete
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.service.deleteOurFeaturedProduct(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Our Featured Product deleted successfully',
    };
  }
}
