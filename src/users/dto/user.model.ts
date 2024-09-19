import { IsString, IsEmail, MinLength, IsUUID } from 'class-validator';

export class UserDTO {
  @IsUUID()
  readonly id: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsString()
  readonly displayName: string;
}
