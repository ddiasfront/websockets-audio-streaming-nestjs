import { Module } from '@nestjs/common';
import { FileNameValidator } from '../validators/file-name-validator';
import { WsExceptionFilter } from './ws-exception-filter';

@Module({
  providers: [WsExceptionFilter, FileNameValidator],
  exports: [WsExceptionFilter, FileNameValidator],
})
export class ErrorsModule {}
