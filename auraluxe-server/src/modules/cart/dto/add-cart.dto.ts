import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class AddToCartDto {
  @IsString()
  productId: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity: number;
}
