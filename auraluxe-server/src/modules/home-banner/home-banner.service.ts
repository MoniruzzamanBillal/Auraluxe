import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateHomeBannerDto } from './dto/create-home-banner.dto';
import { UpdateHomeBannerDto } from './dto/update-home-banner.dto';

@Injectable()
export class HomeBannerService {
  constructor(private prisma: PrismaService) {}

  //

  // ! for creating new home banner
  async addHomeBanner(payload: CreateHomeBannerDto, imgUrl: string) {
    const result = await this.prisma.homeBanner.create({
      data: { ...payload, imageUrl: imgUrl },
    });

    return result;
  }

  // ! for getting all home banner
  async getAllHomeBanner() {
    const result = await this.prisma.homeBanner.findMany({
      where: { isDeleted: false, status: true },
    });

    return result;
  }

  // ! for updating home banner
  async updateHomeBanner(
    payload: UpdateHomeBannerDto,
    id: string,
    imageUrl?: string,
  ) {
    const data = await this.prisma.homeBanner.findFirst({
      where: { id, isDeleted: false, status: true },
    });

    if (!data) {
      throw new NotFoundException("This banner don't exist!!! ");
    }

    let updatedPayload = { ...payload };

    if (imageUrl) {
      updatedPayload = { ...payload, imageUrl };
    }

    const result = await this.prisma.homeBanner.update({
      where: { id },
      data: { ...updatedPayload },
    });

    return result;
  }

  // ! for deleting home banner
  async deleteHomeBanner(id: string) {
    const data = await this.prisma.homeBanner.findFirst({
      where: { id, isDeleted: false, status: true },
    });

    if (!data) {
      throw new NotFoundException("This banner don't exist!!! ");
    }

    await this.prisma.homeBanner.update({
      where: { id },
      data: { isDeleted: true, status: false },
    });
  }

  //
}
