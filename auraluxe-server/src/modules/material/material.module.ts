import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';

@Module({
  imports: [AuthModule],
  controllers: [MaterialController],
  providers: [MaterialService, PrismaService],
})
export class MaterialModule {}
