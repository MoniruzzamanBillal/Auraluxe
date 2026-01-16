import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty({ message: 'Project Name is required' })
  @MinLength(1, { message: 'Project Name is required' })
  @MaxLength(100, { message: 'Project name cannot exceed 100 characters' })
  projectName: string;

  @IsString()
  @IsNotEmpty({ message: 'Project image is required' })
  @IsUrl({}, { message: 'Project image must be a valid URL' })
  projectImg: string;

  @IsString()
  @IsNotEmpty({ message: 'Location is required' })
  @MinLength(1, { message: 'Location is required' })
  @MaxLength(100, { message: 'Location cannot exceed 100 characters' })
  location: string;

  @IsString()
  @IsNotEmpty({ message: 'Client is required' })
  @MinLength(1, { message: 'Client is required' })
  @MaxLength(100, { message: 'Client cannot exceed 100 characters' })
  client: string;

  @IsString()
  @IsNotEmpty({ message: 'Architects is required' })
  @MinLength(1, { message: 'Architects is required' })
  @MaxLength(100, { message: 'Architects cannot exceed 100 characters' })
  architects: string;

  @IsString()
  @IsNotEmpty({ message: 'Website is required' })
  @MinLength(1, { message: 'Website is required' })
  @MaxLength(100, { message: 'Website cannot exceed 100 characters' })
  @IsUrl({}, { message: 'Website must be a valid URL' })
  website: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Facebook link cannot exceed 100 characters' })
  @IsUrl({}, { message: 'Facebook link must be a valid URL' })
  facebookLink?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Instagram link cannot exceed 100 characters' })
  @IsUrl({}, { message: 'Instagram link must be a valid URL' })
  instagramLink?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'LinkedIn link cannot exceed 100 characters' })
  @IsUrl({}, { message: 'LinkedIn link must be a valid URL' })
  linkedinLink?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'X link cannot exceed 100 characters' })
  @IsUrl({}, { message: 'X link must be a valid URL' })
  xLink?: string;

  @IsString()
  @IsNotEmpty({ message: 'Project type ID is required' })
  @MinLength(1, { message: 'Project type ID is required' })
  projectTypeId: string;

  @IsString()
  @IsNotEmpty({ message: 'Material ID is required' })
  @MinLength(1, { message: 'Material ID is required' })
  materialId: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Description cannot exceed 500 characters' })
  description?: string = '';
}
