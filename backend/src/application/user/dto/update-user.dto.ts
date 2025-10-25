/**
 * DTO: Update User
 * Data Transfer Object for updating user profile
 */

import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
