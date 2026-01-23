import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  // ! Add to cart (CREATE cart if needed, UPDATE quantity if exists)
  async addToCart(userId: string, productId: string, quantity = 1) {
    return this.prisma.$transaction(async (tx) => {
      // Check product
      const product = await tx.product.findFirst({
        where: { id: productId, isDeleted: false },
      });

      if (!product) {
        throw new BadRequestException('Product not found');
      }

      if (quantity > product.quantity) {
        throw new BadRequestException('Insufficient stock');
      }

      // Find or create cart
      const cart =
        (await tx.cart.findUnique({ where: { userId, isDeleted: false } })) ??
        (await tx.cart.create({ data: { userId } }));

      // Check if product already in cart
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

  // ! for getting user cart
  async getUserCart(userId: string) {
    const result = await this.prisma.cart.findUnique({
      where: { userId, isDeleted: false },
      include: {
        items: {
          where: { isDeleted: false },
          include: {
            product: true,
          },
        },
      },
    });

    if (result) {
      result.items = result.items.filter((item) => !item.product.isDeleted);
    }

    return result;
  }

  // ! for removing cart item (soft delete)
  async removeCartItem(userId: string, productId: string) {
    return this.prisma.$transaction(async (tx) => {
      // 1️⃣ Find cart
      const cart = await tx.cart.findUnique({
        where: { userId, isDeleted: false },
      });

      if (!cart) {
        throw new BadRequestException('Cart not found');
      }

      // 2️⃣ Check cart item
      const cartItem = await tx.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId,
          },
        },
      });

      if (!cartItem || cartItem.isDeleted) {
        throw new BadRequestException('Product not found in cart');
      }

      // 3️⃣ Soft delete cart item
      await tx.cartItem.update({
        where: { id: cartItem.id },
        data: { isDeleted: true },
      });
    });
  }
}
