import { Controller, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/generated/prisma/enums';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { OrderService } from './order.service';

interface JwtRequest {
  user: {
    userId: string;
    email: string;
    role: UserRole;
  };
}

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  //

  // ! for ordering
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.user)
  @Post('/place-order')
  async orderItem(@Req() req: JwtRequest) {
    const userId = req?.user?.userId;

    const result = await this.orderService.placeOrderFromCart(userId);

    return {
      success: true,
      message: 'Order Places successfully!!!',
      status: HttpStatus.OK,
      data: result,
    };
  }

  //
}
