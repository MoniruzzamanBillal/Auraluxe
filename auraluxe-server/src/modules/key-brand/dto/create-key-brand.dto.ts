import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateKeyBrandDto {
  @IsString()
  @IsNotEmpty({ message: 'Brand name is required' })
  @MaxLength(100, { message: 'Brand name cannot exceed 100 characters' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  @MaxLength(500, { message: 'Description cannot exceed 500 characters' })
  description: string;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean = false;
}
