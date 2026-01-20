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
