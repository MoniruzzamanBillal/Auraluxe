/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import { PAYMENTSTATUS } from 'src/generated/prisma/enums';
import { PrismaService } from 'src/prisma.service';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentService: PaymentService,
  ) {}

  //

  // ! for ordering item

  async placeOrderFromCart(userId: string) {
    return this.prisma.$transaction(async (tx) => {
      // 1️⃣ Get cart
      const cart = await tx.cart.findUnique({
        where: { userId },
        include: {
          items: { include: { product: true } },
          user: true,
        },
      });

      // console.log('------');
      // console.log('cart data = ', cart);
      // console.log('------');

      if (!cart || cart.items.length === 0) {
        throw new BadRequestException('Cart is empty');
      }

      // 2️⃣ Validate stock & total
      let totalAmount = 0;
      for (const item of cart.items) {
        if (item.quantity > item.product.quantity) {
          throw new BadRequestException(
            `Insufficient stock for ${item.product.name}`,
          );
        }
        totalAmount += item.quantity * item.unitPrice;
      }

      // console.log('------');
      // console.log('totalAmount = ', totalAmount);
      // console.log('------');

      // 3️⃣ Create Order
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount,
          items: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
            })),
          },
        },
      });

      // console.log('------');
      // console.log('order = ', order);
      // console.log('------');

      // 4️⃣ Reduce stock
      // for (const item of cart.items) {
      //   await tx.product.update({
      //     where: { id: item.productId },
      //     data: { quantity: { decrement: item.quantity } },
      //   });
      // }

      // 5️⃣ Create Payment (PENDING)
      const transactionId = `TXN-${Date.now()}`;

      const payment = await tx.payment.create({
        data: {
          userId,
          orderId: order.id,
          amount: totalAmount,
          transactionId,
          status: PAYMENTSTATUS.PENDING,
        },
      });

      // console.log('------');
      // console.log('payment = ', payment);
      // console.log('------');

      // 6️⃣ Clear cart
      // await tx.cartItem.deleteMany({
      //   where: { cartId: cart.id },
      // });

      // 7️⃣ Initiate SSL Payment
      const paymentUrl = await this.paymentService.initPayment({
        transactionId,
        amount: totalAmount,
        customerName: cart?.user?.name ?? 'Customer',
        customerEmail: cart?.user?.email ?? 'customer@email.com',
      });

      // console.log('------');
      // console.log('paymentUrl = ', paymentUrl);
      // console.log('------');

      return {
        orderId: order.id,
        paymentId: payment.id,
        paymentUrl,
      };
    });
  }

  //
}
