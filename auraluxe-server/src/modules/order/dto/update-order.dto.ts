import { PartialType } from '@nestjs/mapped-types';
import { ORDERSTATUS } from 'src/generated/prisma/enums';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  status?: ORDERSTATUS;
  isDeleted?: boolean;
}
