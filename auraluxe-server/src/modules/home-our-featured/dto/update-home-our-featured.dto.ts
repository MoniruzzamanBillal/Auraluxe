import { PartialType } from '@nestjs/mapped-types';

import { IsInt, IsOptional, Min } from 'class-validator';
import { CreateHomeOurFeaturedDto } from './create-home-our-featured.dto';

export class UpdateHomeOurFeaturedDto extends PartialType(
  CreateHomeOurFeaturedDto,
) {
  @IsOptional()
  @IsInt()
  @Min(1)
  order?: number;

  @IsOptional()
  imageUrl?: string;
}
