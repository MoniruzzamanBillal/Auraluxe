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
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { MaterialService } from './material.service';

@Controller('material')
export class MaterialController {
  constructor(private materialService: MaterialService) {}

  //

  // ! for creating new material
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Post('')
  async addMaterial(@Body() payload: CreateMaterialDto) {
    const result = await this.materialService.addMaterial(payload);

    return {
      success: true,
      status: HttpStatus.CREATED,
      message: 'Material created successfully!',
      data: result,
    };
  }

  // ! for getting all materials (active only)
  @Get('')
  async getAllMaterials() {
    const result = await this.materialService.getAllMaterials();

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Materials retrieved successfully!',
      data: result,
    };
  }

  // ! for getting single material
  @Get(':id')
  async getSingleMaterial(@Param('id') id: string) {
    const result = await this.materialService.getSingleMaterial(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Material retrieved successfully!',
      data: result,
    };
  }

  // ! for updating material
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Patch(':id')
  async updateMaterial(
    @Param('id') id: string,
    @Body() payload: UpdateMaterialDto,
  ) {
    const result = await this.materialService.updateMaterial(id, payload);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Material updated successfully!',
      data: result,
    };
  }

  // ! for deleting material
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Delete(':id')
  async deleteMaterial(@Param('id') id: string) {
    await this.materialService.deleteMaterial(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Material deleted successfully!',
    };
  }

  //
}
