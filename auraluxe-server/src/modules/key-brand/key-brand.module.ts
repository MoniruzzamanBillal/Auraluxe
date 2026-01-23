import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { KeyBrandController } from './key-brand.controller';
import { KeyBrandService } from './key-brand.service';

@Module({
  imports: [AuthModule],
  controllers: [KeyBrandController],
  providers: [KeyBrandService, PrismaService],
})
export class KeyBrandModule {}
