/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import { PAYMENTSTATUS } from 'src/generated/prisma/enums';
import { PrismaService } from 'src/prisma.service';
import { PaymentService } from '../payment/payment.service';
import { ShippingInfoDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentService: PaymentService,
  ) {}

  //

  // ! for ordering item

  async placeOrderFromCart(userId: string, payload: ShippingInfoDto) {
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
          shippingFullName: payload?.fullName,
          shippingPhone: payload?.phoneNumber,
          shippingAddress: payload?.streetAddress,
          shippingCity: payload?.city,
          shippingPostalCode: payload?.postalCode,
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

  // ! Get user's successful/completed order history
  async getOrderHistory(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: {
        userId,
        isDeleted: false,
        payment: {
          status: PAYMENTSTATUS.COMPLETED,
        },
      },
      include: {
        items: {
          where: { isDeleted: false },
          include: {
            product: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        payment: {
          select: {
            id: true,
            transactionId: true,
            status: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders;
  }

  // ! for getting stats

  async getStats() {
    /* ================= USERS ================= */
    const totalUsers = await this.prisma.user.count({
      where: { isDeleted: false },
    });

    /* ================= ORDERS ================= */
    const totalOrders = await this.prisma.order.count({
      where: { isDeleted: false },
    });

    const revenueResult = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        status: 'COMPLETED',
        isDeleted: false,
      },
    });

    const totalRevenue = revenueResult._sum.amount || 0;

    /* ================= MONTHLY REVENUE ================= */
    const payments = await this.prisma.payment.findMany({
      where: {
        status: 'COMPLETED',
        isDeleted: false,
      },
      select: {
        amount: true,
        createdAt: true,
        orderId: true,
      },
    });

    const revenueMap = new Map<string, { revenue: number; orders: number }>();

    payments.forEach((payment) => {
      const month = payment.createdAt.toLocaleString('en-US', {
        month: 'short',
      });

      if (!revenueMap.has(month)) {
        revenueMap.set(month, { revenue: 0, orders: 0 });
      }

      const entry = revenueMap.get(month)!;
      entry.revenue += payment.amount;
      entry.orders += 1;
    });

    const revenueDatas = Array.from(revenueMap.entries()).map(
      ([month, data]) => ({
        month,
        revenue: Math.round(data.revenue),
        orders: data.orders,
      }),
    );

    /* ================= CATEGORY DISTRIBUTION ================= */
    const products = await this.prisma.product.findMany({
      where: { isDeleted: false },
      include: {
        category: true,
      },
    });

    const categoryMap = new Map<string, number>();

    products.forEach((product) => {
      const name = product.category.name;
      categoryMap.set(name, (categoryMap.get(name) || 0) + 1);
    });

    const totalProducts = products.length || 1;

    const categoryDataPercentage = Array.from(categoryMap.entries()).map(
      ([name, count]) => ({
        name,
        value: Math.round((count / totalProducts) * 100),
      }),
    );

    /* ================= FINAL RESPONSE ================= */
    return {
      statsData: [
        { title: 'Total Users', value: totalUsers },
        { title: 'Total Orders', value: totalOrders },
        { title: 'Total Revenue', value: totalRevenue },
      ],
      revenueDatas,
      categoryDataPercentage,
    };
  }

  //
}
