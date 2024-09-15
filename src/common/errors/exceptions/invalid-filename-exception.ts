import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidFileNameException extends HttpException {
  constructor() {
    super('Invalid file name provided.', HttpStatus.BAD_REQUEST);
  }
}
