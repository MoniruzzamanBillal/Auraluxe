import {
  Body,
  Controller,
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
import { BrandTypeService } from './brand-type.service';
import { CreateBrandTypeDto } from './dto/CreateBrandTypeDto';
import { UpdateBrandTypeDto } from './dto/UpdateBrandTypeDto';

@Controller('brand-type')
export class BrandTypeController {
  constructor(private brandTypeService: BrandTypeService) {}

  //
  // ! for creating new brandType
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Post('')
  async addBrandType(@Body() payload: CreateBrandTypeDto) {
    const result = await this.brandTypeService.addBrandType(payload);

    return {
      success: true,
      status: HttpStatus.CREATED,
      message: 'BrandType created successfully!!!',
      data: result,
    };
  }

  //   ! for getting all brand type
  @Get('')
  async getAllBrandType() {
    const result = await this.brandTypeService.getAllBrandTypes();

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'BrandTypes Retrived successfully!!!',
      data: result,
    };
  }

  // ! for getting single brand type
  @Get(':id')
  async getSingleBrandType(@Param('id') id: string) {
    const result = await this.brandTypeService.getSingleBrandType(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'BrandType Retrived successfully!!!',
      data: result,
    };
  }

  //   ! for updating brand type
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Patch(':id')
  async updateBrandType(
    @Param('id') id: string,
    @Body() pyaload: UpdateBrandTypeDto,
  ) {
    const result = await this.brandTypeService.updateBrandType(id, pyaload);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'BrandType Updated successfully!!!',
      data: result,
    };
  }

  // ! for deleting brandtype
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Patch('delete/:id')
  async deleteBrandType(@Param('id') id: string) {
    await this.brandTypeService.deleteBrandType(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'BrandType Deleted successfully!!!',
    };
  }

  //
}
