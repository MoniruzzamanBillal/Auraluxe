import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { PaymentService } from '../payment/payment.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [AuthModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService, PaymentService],
})
export class OrderModule {}
