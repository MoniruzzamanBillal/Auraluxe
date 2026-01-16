import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './CreateCategoryDto.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
