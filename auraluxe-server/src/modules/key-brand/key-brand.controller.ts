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

import { CreateKeyBrandDto } from './dto/create-key-brand.dto';
import { UpdateKeyBrandDto } from './dto/update-key-brand.dto';
import { KeyBrandService } from './key-brand.service';

@Controller('key-brand')
export class KeyBrandController {
  constructor(private keyBrandsService: KeyBrandService) {}

  //

  // ! for creating new key brand
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/key-brands',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  async addKeyBrand(
    @Body() payload: CreateKeyBrandDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Brand logo is required');
    }

    const logoUrl = `${process.env.APP_URL}/uploads/key-brands/${file?.filename}`;

    const result = await this.keyBrandsService.addKeyBrand(payload, logoUrl);

    return {
      success: true,
      status: HttpStatus.CREATED,
      message: 'Key brand created successfully!',
      data: result,
    };
  }

  // ! for getting all key brands
  @Get('')
  async getAllKeyBrands() {
    const result = await this.keyBrandsService.getAllKeyBrands();

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Key brands retrieved successfully!',
      data: result,
    };
  }

  // ! for getting single key brand
  @Get(':id')
  async getSingleKeyBrand(@Param('id') id: string) {
    const result = await this.keyBrandsService.getSingleKeyBrand(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Key brand retrieved successfully!',
      data: result,
    };
  }

  // ! for updating key brand
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/key-brands',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  async updateKeyBrand(
    @Param('id') id: string,
    @Body() payload: UpdateKeyBrandDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let imageUrl: string | undefined;

    if (file) {
      imageUrl = `${process.env.APP_URL}/uploads/key-brands/${file?.filename}`;
    }

    const result = await this.keyBrandsService.updateKeyBrand(
      id,
      payload,
      imageUrl,
    );

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Key brand updated successfully!',
      data: result,
    };
  }

  // ! for deleting key brand
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Delete(':id')
  async deleteKeyBrand(@Param('id') id: string) {
    await this.keyBrandsService.deleteKeyBrand(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Key brand deleted successfully!',
    };
  }

  //
}
