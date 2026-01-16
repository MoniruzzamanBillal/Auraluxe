import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { HomeOurProductController } from './home-our-product.controller';
import { HomeOurProductService } from './home-our-product.service';

@Module({
  imports: [AuthModule],
  providers: [HomeOurProductService, PrismaService],
  controllers: [HomeOurProductController],
})
export class HomeOurProductModule {}
