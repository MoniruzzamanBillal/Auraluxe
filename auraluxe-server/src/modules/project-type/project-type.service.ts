import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectTypeDto } from './dto/CreateProjectTypeDto';
import { UpdateProjectTypeDto } from './dto/UpdateProjectTypeDto';

@Injectable()
export class ProjectTypeService {
  constructor(private prisma: PrismaService) {}

  //

  // ! for creating new project type
  async addProjectType(payload: CreateProjectTypeDto) {
    const result = await this.prisma.projectType.create({ data: payload });

    return result;
  }

  // ! for getting all project type
  async getAllProjectType() {
    const result = await this.prisma.projectType.findMany({
      where: { isDeleted: false },
    });

    return result;
  }

  // ! for getting single project type
  async getProjectTypeDetail(id: string) {
    const result = await this.prisma.projectType.findUnique({
      where: { id, status: true, isDeleted: false },
    });

    if (!result) {
      throw new NotFoundException("This Project type don't exist!!! ");
    }

    return result;
  }

  // ! for updating project type
  async updateProjectType(id: string, payload: UpdateProjectTypeDto) {
    const data = await this.prisma.projectType.findUnique({
      where: { id, isDeleted: false },
    });

    if (!data) {
      throw new NotFoundException("This project type don't exist!!! ");
    }

    const result = await this.prisma.projectType.update({
      where: { id },
      data: payload,
    });

    return result;
  }

  // ! for deleting project type
  async deleteProjectType(id: string) {
    await this.prisma.projectType.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  //
}
