import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateProjectDto } from './createProject.dto';

export class updateProjectDto extends PartialType(CreateProjectDto) {
  @IsOptional()
  projectImg?: string;
}
