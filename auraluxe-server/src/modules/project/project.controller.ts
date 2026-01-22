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
import { CreateProjectDto } from './dto/createProject.dto';
import { updateProjectDto } from './dto/updateProject.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  // ! for creating new project
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
  async addProject(
    @Body() payload: CreateProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Image is required');
    }

    const imageUrl = `${process.env.APP_URL}/uploads/${file?.filename}`;

    const result = await this.projectService.addProject(payload, imageUrl);

    return {
      success: true,
      status: HttpStatus.CREATED,
      message: 'project created successfully!!!',
      data: result,
    };
  }

  // ! for getting all projects
  @Get('')
  async getAllProject() {
    const result = await this.projectService.getAllProject();

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Projects retrieved successfully!',
      data: result,
    };
  }

  // ! for getting single project
  @Get(':id')
  async getSingleProject(@Param('id') id: string) {
    const result = await this.projectService.getSingleProject(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'project retrived successfully!!!',
      data: result,
    };
  }

  // ! UPDATE PROJECT (ADMIN)
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
  async updateProject(
    @Param('id') id: string,
    @Body() payload: updateProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let imageUrl: string | undefined;

    if (file) {
      imageUrl = `${process.env.APP_URL}/uploads/${file?.filename}`;
    }

    const result = await this.projectService.updateProject(
      id,
      payload,
      imageUrl,
    );

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Project updated successfully!',
      data: result,
    };
  }

  // ! DELETE PROJECT (SOFT DELETE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    await this.projectService.deleteProject(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Project deleted successfully!',
    };
  }

  //
}
