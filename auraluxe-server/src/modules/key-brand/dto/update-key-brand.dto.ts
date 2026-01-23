import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateKeyBrandDto } from './create-key-brand.dto';

export class UpdateKeyBrandDto extends PartialType(CreateKeyBrandDto) {
  @IsOptional()
  logo: string;
}
