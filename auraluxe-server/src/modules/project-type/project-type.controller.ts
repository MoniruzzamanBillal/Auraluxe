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
import { CreateProjectTypeDto } from './dto/CreateProjectTypeDto';
import { UpdateProjectTypeDto } from './dto/UpdateProjectTypeDto';
import { ProjectTypeService } from './project-type.service';

@Controller('project-type')
export class ProjectTypeController {
  constructor(private projectTypeService: ProjectTypeService) {}

  //

  // ! for creating new project type
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Post('')
  async addProjectType(@Body() payload: CreateProjectTypeDto) {
    const result = await this.projectTypeService.addProjectType(payload);

    return {
      success: true,
      status: HttpStatus.CREATED,
      message: 'project type created successfully!!!',
      data: result,
    };
  }

  //   ! for getting all project type
  @Get('')
  async getAllProjectType() {
    const result = await this.projectTypeService.getAllProjectType();

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'all project type retrived successfully!!!',
      data: result,
    };
  }

  //   ! for getting single project type
  @Get(':id')
  async getSingleProjectType(@Param('id') id: string) {
    const result = await this.projectTypeService.getProjectTypeDetail(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'project type retrived successfully!!!',
      data: result,
    };
  }

  //   ! for updating project type
  @Patch(':id')
  async updateProjectType(
    @Param('id') id: string,
    @Body() payload: UpdateProjectTypeDto,
  ) {
    const result = await this.projectTypeService.updateProjectType(id, payload);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'project type updated successfully!!!',
      data: result,
    };
  }

  // ! for deleting project type
  @Delete(':id')
  async deleteProjectType(@Param('id') id: string) {
    await this.projectTypeService.deleteProjectType(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'project type deleted successfully!!!',
    };
  }

  //
}
