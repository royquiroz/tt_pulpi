/* eslint-disable prettier/prettier */
import { IsEnum, IsString, MinLength } from 'class-validator';
import { UserStatus } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @MinLength(13)
  rfc: string;

  @IsString()
  name: string;

  @IsString()
  last_name: string;

  @IsEnum(UserStatus)
  status: UserStatus;
}
