import {
  IsString,
  IsDate,
  IsBoolean,
  IsArray,
  IsOptional,
} from 'class-validator';

export class TicketDTO {
  @IsString()
  readonly id: string;

  @IsString()
  readonly userId: string;

  @IsDate()
  readonly createdAt: Date;

  @IsDate()
  readonly expiresAt: Date;

  @IsBoolean()
  readonly isRevoked: boolean;

  @IsArray()
  @IsString({ each: true })
  readonly scopes: string[];

  @IsOptional()
  @IsString()
  readonly nonce?: string;

  @IsOptional()
  @IsString()
  readonly signature?: string;

  @IsString()
  readonly issuedBy: string;

  @IsString()
  readonly audience: string;

  @IsString()
  readonly tokenType: string;
}
