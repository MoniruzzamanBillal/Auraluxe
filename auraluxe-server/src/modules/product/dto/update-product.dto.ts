import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class updateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  productImage?: string;
}
