import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { HomeBannerController } from './home-banner.controller';
import { HomeBannerService } from './home-banner.service';

@Module({
  imports: [AuthModule],
  controllers: [HomeBannerController],
  providers: [HomeBannerService, PrismaService],
})
export class HomeBannerModule {}
