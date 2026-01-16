import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectTypeDto } from './CreateProjectTypeDto';

export class UpdateProjectTypeDto extends PartialType(CreateProjectTypeDto) {}
