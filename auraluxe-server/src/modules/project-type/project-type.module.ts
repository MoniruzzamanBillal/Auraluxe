import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { ProjectTypeController } from './project-type.controller';
import { ProjectTypeService } from './project-type.service';

@Module({
  imports: [AuthModule],
  providers: [ProjectTypeService, PrismaService],
  controllers: [ProjectTypeController],
})
export class ProjectTypeModule {}
