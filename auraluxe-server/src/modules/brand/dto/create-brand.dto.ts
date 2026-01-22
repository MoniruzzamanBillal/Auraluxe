import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty({ message: 'Brand name is required' })
  @MaxLength(100, { message: 'Brand name cannot exceed 100 characters' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Brand type ID is required' })
  brandTypeId: string;
}
