import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from 'src/generated/prisma/enums';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-cart.dto';

interface JwtRequest {
  user: {
    userId: string;
    email: string;
    role: UserRole;
  };
}

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  //
  // ! for managing cart
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.user)
  @Post('')
  async addBrandType(@Body() payload: AddToCartDto, @Req() req: JwtRequest) {
    const result = await this.cartService.addToCart(
      req.user?.userId,
      payload?.productId,
      payload?.quantity,
    );

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Cart Updated successfully!!!',
      data: result,
    };
  }

  // ! Get user cart
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.user)
  @Get()
  async getUserCart(@Req() req: JwtRequest) {
    const userId = req.user.userId;

    const result = await this.cartService.getUserCart(userId);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Cart retrived successfully!!!',
      data: result,
    };
  }

  // ! for removing user cart item
  //  @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.user)
  // @Patch("remove-cart-item")
  // async removeCartItem(){

  // }

  //
}
