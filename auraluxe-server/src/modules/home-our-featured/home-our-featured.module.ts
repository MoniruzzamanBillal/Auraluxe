import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { HomeOurFeaturedController } from './home-our-featured.controller';
import { HomeOurFeaturedService } from './home-our-featured.service';

@Module({
  imports: [AuthModule],
  providers: [HomeOurFeaturedService, PrismaService],
  controllers: [HomeOurFeaturedController],
})
export class HomeOurFeaturedModule {}
