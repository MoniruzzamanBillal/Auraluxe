import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandTypeDto } from './CreateBrandTypeDto';

export class UpdateBrandTypeDto extends PartialType(CreateBrandTypeDto) {}
