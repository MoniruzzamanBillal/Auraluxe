import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateOurFeaturedProductDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  order?: number;

  @IsOptional()
  imageUrl?: string;
}
