import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BrandTypeModule } from './modules/brand-type/brand-type.module';
import { CategoryModule } from './modules/category/category.module';

import { HomeBannerModule } from './modules/home-banner/home-banner.module';
import { HomeOurFeaturedModule } from './modules/home-our-featured/home-our-featured.module';
import { HomeOurProductModule } from './modules/home-our-product/home-our-product.module';
import { OurFeaturedProductModule } from './modules/our-featured-product/our-featured-product.module';
import { ProductModule } from './modules/product/product.module';
import { ProjectTypeModule } from './modules/project-type/project-type.module';
import { ProjectModule } from './modules/project/project.module';
import { UserModule } from './modules/user/user.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { PaymentModule } from './modules/payment/payment.module';

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

    CategoryModule,

    CartModule,

    OrderModule,

    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
