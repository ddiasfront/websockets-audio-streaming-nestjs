import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileNameValidator {
  validateAndSanitizeFileName(fileName: string): string {
    const isValidFileName = /^[a-zA-Z0-9-]+$/.test(fileName);

    if (!isValidFileName) {
      throw new BadRequestException(
        'Invalid file name. Only alphanumeric characters and dashes are allowed. Periods and other special characters are not accepted.',
      );
    }

    return fileName;
  }
}
