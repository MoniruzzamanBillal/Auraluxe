import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { OurFeaturedProductController } from './our-featured-product.controller';
import { OurFeaturedProductService } from './our-featured-product.service';

@Module({
  imports: [AuthModule],
  controllers: [OurFeaturedProductController],
  providers: [OurFeaturedProductService, PrismaService],
})
export class OurFeaturedProductModule {}
