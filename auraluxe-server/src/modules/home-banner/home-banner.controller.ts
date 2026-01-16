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
import { CreateHomeBannerDto } from './dto/create-home-banner.dto';
import { UpdateHomeBannerDto } from './dto/update-home-banner.dto';
import { HomeBannerService } from './home-banner.service';

@Controller('home-banner')
export class HomeBannerController {
  constructor(private bannerService: HomeBannerService) {}

  //
  // ! for creating home banner
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
  async addHomeBanner(
    @Body() payload: CreateHomeBannerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const imageUrl = `${process.env.APP_URL}/uploads/${file?.filename}`;

    const result = await this.bannerService.addHomeBanner(payload, imageUrl);

    return {
      success: true,
      status: HttpStatus.CREATED,
      message: 'Home Banner created successfully!!!',
      data: result,
    };
  }

  // ! for getting all home banner
  @Get('')
  async getAllHomeBanner() {
    const result = await this.bannerService.getAllHomeBanner();

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Home Banner retrived successfully!!!',
      data: result,
    };
  }

  // ! for updating home banner
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
  async updateHomeBanner(
    @Param('id') id: string,
    @Body() payload: UpdateHomeBannerDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let imageUrl: string | undefined;

    if (file) {
      imageUrl = `${process.env.APP_URL}/uploads/${file.filename}`;
    }

    const result = await this.bannerService.updateHomeBanner(
      payload,
      id,
      imageUrl,
    );

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Home Banner updated successfully',
      data: result,
    };
  }

  // ! for deleting home banner
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Delete(':id')
  async deleteHomeBanner(@Param('id') id: string) {
    await this.bannerService.deleteHomeBanner(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Home Banner deleted successfully',
    };
  }

  //
}
