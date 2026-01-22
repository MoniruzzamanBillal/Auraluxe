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
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  //

  // ! for creating new brand
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
  async addBrand(
    @Body() payload: CreateBrandDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Image is required');
    }

    const imageUrl = `${process.env.APP_URL}/uploads/${file?.filename}`;

    const result = await this.brandService.addBrand(payload, imageUrl);

    return {
      success: true,
      status: HttpStatus.CREATED,
      message: 'Brand created successfully!',
      data: result,
    };
  }

  // ! for getting all brands
  @Get('')
  async getAllBrands() {
    const result = await this.brandService.getAllBrands();

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Brands retrieved successfully!',
      data: result,
    };
  }

  // ! for getting single brand
  @Get(':id')
  async getSingleBrand(@Param('id') id: string) {
    const result = await this.brandService.getSingleBrand(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Brand retrieved successfully!',
      data: result,
    };
  }

  // ! for updating brand
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
  async updateBrand(
    @Param('id') id: string,
    @Body() payload: UpdateBrandDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let imageUrl: string | undefined;

    if (file) {
      imageUrl = `${process.env.APP_URL}/uploads/${file?.filename}`;
    }

    const result = await this.brandService.updateBrand(id, payload, imageUrl);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Brand updated successfully!',
      data: result,
    };
  }

  // ! for deleting brand
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Delete(':id')
  async deleteBrand(@Param('id') id: string) {
    await this.brandService.deleteBrand(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Brand deleted successfully!',
    };
  }

  //
}
