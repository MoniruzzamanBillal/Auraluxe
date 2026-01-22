import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';

@Module({
  imports: [AuthModule],
  controllers: [BrandController],
  providers: [BrandService, PrismaService],
})
export class BrandModule {}
