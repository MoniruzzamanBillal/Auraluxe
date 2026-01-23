import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ORDERSTATUS } from 'src/generated/prisma/enums';

export class CreateOrderDto {
  userId: string;
  items: OrderItemDto[];
  totalAmount: number;
  status?: ORDERSTATUS;
}

export class OrderItemDto {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export class ShippingInfoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  streetAddress: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  city: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  postalCode: string;
}
