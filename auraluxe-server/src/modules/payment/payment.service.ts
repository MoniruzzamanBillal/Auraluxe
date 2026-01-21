import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as qs from 'qs';
import { ORDERSTATUS, PAYMENTSTATUS } from 'src/generated/prisma/enums';
import { PrismaService } from 'src/prisma.service';

import { firstValueFrom } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  //

  // ! initiate payment
  async initPayment(payload: {
    transactionId: string;
    amount: number;
    customerName: string;
    customerEmail: string;
  }) {
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

    const data = {
      store_id: process.env.STORE_ID,
      store_passwd: process.env.STORE_PASSWORD,
      total_amount: payload.amount,
      currency: 'BDT',
      tran_id: payload.transactionId,

      success_url: `${baseUrl}/api/payment/success`,
      fail_url: `${baseUrl}/api/payment/fail`,
      cancel_url: `${baseUrl}/api/payment/cancel`,

      ipn_url: 'http://localhost:3030/ipn',
      shipping_method: 'Courier',
      product_name: 'dummy product',
      product_category: 'category',
      product_profile: 'general',
      cus_name: payload.customerName,
      cus_email: payload.customerEmail,
      cus_add1: 'N/A',
      cus_add2: 'N/A',
      cus_city: 'N/A',
      cus_state: 'N/A',
      cus_postcode: 'N/A',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: payload?.customerName,
      ship_add1: 'N/A',
      ship_add2: 'N/A',
      ship_city: 'N/A',
      ship_state: 'N/A',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };

    try {
      const formData = qs.stringify(data);

      const response = await firstValueFrom(
        this.httpService.post(
          'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
          formData,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            timeout: 10000, // 10 seconds timeout
          },
        ),
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!response?.data?.GatewayPageURL) {
        throw new Error('Failed to initiate SSL payment');
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return response?.data?.GatewayPageURL;
    } catch (error) {
      console.log('error from initiate payment = ', error);
    }
  }

  // ! succesfull payment
  async successfullPayment(transactionId: string) {
    return this.prisma.$transaction(async (tx) => {
      const payment = await tx.payment.findUnique({
        where: { transactionId },
        include: {
          order: {
            include: { items: true },
          },
        },
      });

      if (!payment || payment.status === PAYMENTSTATUS.COMPLETED) {
        return { success: true };
      }

      // 1️⃣ Reduce stock
      for (const item of payment.order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            quantity: { decrement: item.quantity },
          },
        });
      }

      // 2️⃣ Clear cart (IMPORTANT)
      // const cart = await tx.cart.findUnique({
      //   where: { userId: payment.userId },
      // });
      // if (cart) {
      //   await tx.cartItem.deleteMany({
      //     where: { cartId: cart.id },
      //   });
      // }
      // 2️⃣ Clear ONLY cart items (KEEP cart)
      await tx.cartItem.deleteMany({
        where: {
          cart: {
            userId: payment.userId,
          },
        },
      });

      // 2️⃣ Update payment
      await tx.payment.update({
        where: { id: payment.id },
        data: { status: PAYMENTSTATUS.COMPLETED },
      });

      // 3️⃣ Update order
      await tx.order.update({
        where: { id: payment.orderId },
        data: { status: ORDERSTATUS.PAID },
      });

      return { success: true };
    });
  }

  // ! cancel , fail payment

  async handleFailedOrCanceledPayment(transactionId: string) {
    return this.prisma.$transaction(async (tx) => {
      const payment = await tx.payment.findUnique({
        where: { transactionId },
        include: {
          order: true,
        },
      });

      // Already handled or invalid callback
      if (!payment) {
        return { success: true };
      }

      // 1️⃣ Delete payment first (FK safe)
      await tx.payment.delete({
        where: { id: payment?.id },
      });

      // 2️⃣ Delete order
      await tx.order.delete({
        where: { id: payment?.orderId },
      });

      return { success: true };
    });
  }

  //
}
