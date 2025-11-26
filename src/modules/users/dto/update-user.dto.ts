import { IsEmail, IsNotEmpty, IsString, IsIn, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsIn(['user', 'admin'])
  @IsOptional()
  role?: string;
}