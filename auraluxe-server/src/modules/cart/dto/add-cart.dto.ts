import { IsInt, IsOptional, IsString } from 'class-validator';

export class AddToCartDto {
  @IsString()
  productId: string;

  @IsOptional()
  @IsInt()
  quantity: number;
}
