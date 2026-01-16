import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { BrandTypeController } from './brand-type.controller';
import { BrandTypeService } from './brand-type.service';

@Module({
  imports: [AuthModule],
  providers: [BrandTypeService, PrismaService],
  controllers: [BrandTypeController],
})
export class BrandTypeModule {}
