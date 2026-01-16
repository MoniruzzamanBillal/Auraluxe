import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './createProject.dto';

export class updateProjectDto extends PartialType(CreateProjectDto) {}
