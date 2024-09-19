import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistsException extends BadRequestException {
  constructor(email: string) {
    super(`A user with the email ${email} already exists.`);
  }
}
