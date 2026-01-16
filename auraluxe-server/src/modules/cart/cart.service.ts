import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  //

  // ! Add to cart (CREATE cart if needed, UPDATE quantity if exists)
  async addToCart(userId: string, productId: string, quantity = 1) {
    return this.prisma.$transaction(async (tx) => {
      //  Check product
      const product = await tx.product.findFirst({
        where: { id: productId, isDeleted: false, status: true },
      });

      if (!product) {
        throw new BadRequestException('Product not found');
      }

      if (quantity > product.quantity) {
        throw new BadRequestException('Insufficient stock');
      }

      //  Find or create cart
      const cart =
        (await tx.cart.findUnique({ where: { userId } })) ??
        (await tx.cart.create({ data: { userId } }));

      //  Check if product already in cart
      const cartItem = await tx.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId,
          },
        },
      });

      // Update or create cart item
      if (cartItem) {
        return tx.cartItem.update({
          where: { id: cartItem.id },
          data: {
            quantity: cartItem.quantity + quantity,
          },
        });
      }

      return tx.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          unitPrice: product.price,
        },
      });
    });
  }

  async getUserCart(userId: string) {
    const result = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return result;
  }

  //
}
