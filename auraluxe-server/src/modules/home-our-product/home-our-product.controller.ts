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
import { CreateHomeOurProductDto } from './dto/create-home-our-product.dto';
import { UpdateHomeOurProductDto } from './dto/update-home-our-product.dto';
import { HomeOurProductService } from './home-our-product.service';

@Controller('home-our-product')
export class HomeOurProductController {
  constructor(private service: HomeOurProductService) {}

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
  async add(
    @Body() payload: CreateHomeOurProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const imageUrl = `${process.env.APP_URL}/uploads/${file.filename}`;

    const result = await this.service.addHomeOurProduct(payload, imageUrl);

    return {
      success: true,
      status: HttpStatus.CREATED,
      message: 'Home Our Product created successfully',
      data: result,
    };
  }

  // ! get all
  @Get('')
  async getAll() {
    const result = await this.service.getAllHomeOurProduct();

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Home Our Product retrieved successfully',
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
    @Body() payload: UpdateHomeOurProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const imageUrl = file
      ? `${process.env.APP_URL}/uploads/${file.filename}`
      : undefined;

    const result = await this.service.updateHomeOurProduct(
      payload,
      id,
      imageUrl,
    );

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Home Our Product updated successfully',
      data: result,
    };
  }

  // ! delete
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.service.deleteHomeOurProduct(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Home Our Product deleted successfully',
    };
  }
}
