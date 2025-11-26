import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsIn } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsIn(['user', 'admin'])
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  imagen?: string;
}