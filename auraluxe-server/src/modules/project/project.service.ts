import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { updateProjectDto } from './dto/updateProject.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  // ! for adding new project
  async addProject(payload: CreateProjectDto, imageUrl: string) {
    const result = await this.prisma.project.create({
      data: { ...payload, projectImg: imageUrl },
    });

    return result;
  }

  // ! for getting all project
  async getAllProject() {
    return this.prisma.project.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        projectType: true,
        material: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ! for getting single project
  async getSingleProject(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        projectType: true,
      },
    });

    if (!project || project.isDeleted) {
      throw new NotFoundException("This project doesn't exist!");
    }

    return project;
  }

  // ! for updating project

  async updateProject(
    id: string,
    payload: updateProjectDto,
    imageUrl?: string,
  ) {
    const updatedPayload = {
      ...payload,
    };

    if (imageUrl) {
      updatedPayload.projectImg = imageUrl;
    }

    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project || project.isDeleted) {
      throw new NotFoundException('Project not found!');
    }

    // Project name uniqueness check
    if (payload.projectName && payload.projectName !== project.projectName) {
      const existingProject = await this.prisma.project.findUnique({
        where: { projectName: payload.projectName },
      });

      if (existingProject) {
        throw new NotFoundException('Project with this name already exists!');
      }
    }

    return this.prisma.project.update({
      where: { id },
      data: updatedPayload,
    });
  }

  // ! for deleting
  async deleteProject(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project || project.isDeleted) {
      throw new NotFoundException('Project not found!');
    }

    await this.prisma.project.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    return { message: 'Project deleted successfully' };
  }

  //
}
