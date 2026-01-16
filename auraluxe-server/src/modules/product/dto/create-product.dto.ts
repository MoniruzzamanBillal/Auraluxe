import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Product name is required' })
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  productCode?: string;

  @IsUUID()
  @IsNotEmpty({ message: 'Brand ID is required' })
  brandId: string;

  @IsUUID()
  @IsNotEmpty({ message: 'Category ID is required' })
  categoryId: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty({ message: 'Key features are required' })
  keyFeatures: string;

  @IsString()
  @IsNotEmpty({ message: 'Specifications are required' })
  specifications: string;

  @IsString()
  @IsNotEmpty({ message: 'Product description is required' })
  productDes: string;

  @IsOptional()
  @IsString()
  shippingDelivery?: string;

  @IsString()
  @IsNotEmpty({ message: 'Product image is required' })
  productImage: string;
}
