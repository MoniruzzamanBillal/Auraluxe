import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  //

  // ! for creating new product
  async addProduct(payload: CreateProductDto, imageUrl: string) {
    // Check if category exists and is active
    const category = await this.prisma.category.findUnique({
      where: {
        id: payload.categoryId,
        isDeleted: false,
        status: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found or inactive!');
    }

    // Check for duplicate product name in same category
    const existingProduct = await this.prisma.product.findFirst({
      where: {
        name: payload.name,
        categoryId: payload.categoryId,
        isDeleted: false,
      },
    });

    if (existingProduct) {
      throw new NotFoundException(
        'Product with this name already exists in this category!',
      );
    }

    const result = await this.prisma.product.create({
      data: {
        ...payload,
        productImage: imageUrl,
        quantity: payload.quantity || 0, // Ensure quantity is set
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return result;
  }

  // ! for getting all active products
  async getAllProduct() {
    const result = await this.prisma.product.findMany({
      where: {
        isDeleted: false,
        status: true,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return result;
  }

  // ! for getting single product data
  async getSingleProduct(productId: string) {
    const result = await this.prisma.product.findFirst({
      where: {
        id: productId,
        isDeleted: false,
        status: true,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!result) {
      throw new NotFoundException("This product doesn't exist!");
    }

    return result;
  }

  // ! for updating product
  async updateProduct(
    id: string,
    payload: updateProductDto,
    imageUrl?: string,
  ) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product || product.isDeleted) {
      throw new NotFoundException('Product not found!');
    }

    // Check if category exists (if categoryId is being updated)
    if (payload.categoryId && payload.categoryId !== product.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: {
          id: payload.categoryId,
          isDeleted: false,
          status: true,
        },
      });

      if (!category) {
        throw new NotFoundException('Category not found or inactive!');
      }
    }

    // Check for duplicate product name in same category
    if (payload.name && payload.name !== product.name) {
      const existingProduct = await this.prisma.product.findFirst({
        where: {
          name: payload.name,
          categoryId: payload.categoryId || product.categoryId,
          isDeleted: false,
          NOT: { id: id },
        },
      });

      if (existingProduct) {
        throw new NotFoundException(
          'Product with this name already exists in this category!',
        );
      }
    }

    const updateData = { ...payload };
    if (imageUrl) {
      updateData.productImage = imageUrl;
    }

    const result = await this.prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return result;
  }

  // ! for soft deleting product
  async deleteProduct(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product || product.isDeleted) {
      throw new NotFoundException('Product not found!');
    }

    // Check if product is in any active cart
    const cartItems = await this.prisma.cartItem.count({
      where: {
        productId: id,
        isDeleted: false,
        cart: {
          isDeleted: false,
        },
      },
    });

    if (cartItems > 0) {
      throw new NotFoundException(
        'Cannot delete product. It is currently in user carts. Please remove from carts first.',
      );
    }

    // Check if product is in any active order
    const orderItems = await this.prisma.orderItem.count({
      where: {
        productId: id,
        isDeleted: false,
        order: {
          isDeleted: false,
        },
      },
    });

    if (orderItems > 0) {
      throw new NotFoundException(
        'Cannot delete product. It is part of existing orders.',
      );
    }

    // Soft delete the product
    await this.prisma.product.update({
      where: { id },
      data: {
        isDeleted: true,
        status: false,
      },
    });

    return { message: 'Product deleted successfully' };
  }

  //
}
