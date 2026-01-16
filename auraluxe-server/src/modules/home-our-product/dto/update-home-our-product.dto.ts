import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional, Min } from 'class-validator';
import { CreateHomeOurProductDto } from './create-home-our-product.dto';

export class UpdateHomeOurProductDto extends PartialType(
  CreateHomeOurProductDto,
) {
  @IsOptional()
  @IsInt()
  @Min(1)
  order?: number;

  @IsOptional()
  imageUrl?: string;
}
