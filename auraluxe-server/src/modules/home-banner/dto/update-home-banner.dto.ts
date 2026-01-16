import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeBannerDto } from './create-home-banner.dto';

import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateHomeBannerDto extends PartialType(CreateHomeBannerDto) {
  @IsOptional()
  @IsInt()
  @Min(1)
  order?: number;

  @IsOptional()
  imageUrl?: string;
}
