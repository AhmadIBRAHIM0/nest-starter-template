import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  readonly password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly phone?: string;

  @IsOptional()
  readonly roles?: number[];
}
