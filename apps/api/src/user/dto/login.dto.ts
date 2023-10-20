import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  zeroId: string;

  @IsEmail()
  email: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  nickname?: string;

  @IsOptional()
  picture?: string;
}
