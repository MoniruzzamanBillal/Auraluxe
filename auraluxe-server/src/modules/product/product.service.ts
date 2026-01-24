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
        quantity: payload.quantity || 0,
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
  async getAllProduct(query: {
    categoryId?: string;
    brandId?: string;
    sortBy?: 'price_asc' | 'price_desc';

    page?: number;
    limit?: number;
  }) {
    const {
      categoryId,
      brandId,
      sortBy = 'newest',

      page = 1,
      limit = 12,
    } = query;

    const skip = (page - 1) * limit;

    const where: Record<string, any> = {
      isDeleted: false,
    };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (brandId) {
      where.brandId = brandId;
    }

    let orderBy: Record<string, any> = { createdAt: 'desc' };

    switch (sortBy) {
      case 'price_asc':
        orderBy = { price: 'asc' };
        break;
      case 'price_desc':
        orderBy = { price: 'desc' };
        break;

      default:
        orderBy = { createdAt: 'desc' };
        break;
    }

    const total = await this.prisma.product.count({ where });

    const products = await this.prisma.product.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        brand: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    });

    return {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ! Get products from same category (excluding the given product)
  async getSameCategoryProducts(productId: string, limit = 8) {
    // Validate product exists and get its category
    const product = await this.prisma.product.findFirst({
      where: {
        id: productId,
        isDeleted: false,
      },
      select: {
        id: true,
        categoryId: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    // Get products from same category, excluding the given product
    const sameCategoryProducts = await this.prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        isDeleted: false,
        NOT: {
          id: productId,
        },
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        brand: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
      },
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return sameCategoryProducts;
  }

  // ! for getting single product data
  async getSingleProduct(productId: string) {
    const result = await this.prisma.product.findFirst({
      where: {
        id: productId,
        isDeleted: false,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        brand: {
          select: {
            id: true,
            name: true,
            logo: true,
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
      },
    });

    return { message: 'Product deleted successfully' };
  }

  //
}
