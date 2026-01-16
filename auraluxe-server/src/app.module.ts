import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/project/project.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { BrandTypeModule } from './modules/brand-type/brand-type.module';
import { ProjectTypeModule } from './modules/project-type/project-type.module';
import { HomeBannerModule } from './modules/home-banner/home-banner.module';
import { HomeOurFeaturedModule } from './modules/home-our-featured/home-our-featured.module';
import { HomeOurProductModule } from './modules/home-our-product/home-our-product.module';
import { OurFeaturedProductModule } from './modules/our-featured-product/our-featured-product.module';
import { ControllerModule } from './modules/controller/controller.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    ProjectModule,
    ProductModule,
    BrandTypeModule,
    ProjectTypeModule,
    HomeBannerModule,
    HomeOurFeaturedModule,
    HomeOurProductModule,
    OurFeaturedProductModule,
    ControllerModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
