import { IsInt, IsPositive, IsString } from 'class-validator';

export class UpdateCartQuantityDto {
  @IsString()
  productId: string;

  @IsInt()
  @IsPositive()
  quantity: number;
}
