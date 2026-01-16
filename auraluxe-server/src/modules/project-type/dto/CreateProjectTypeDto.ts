import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProjectTypeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50, { message: 'Name can not exceed 50 words!!!' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(500, { message: 'Description can not exceed 50 words!!!' })
  description: string;
}
