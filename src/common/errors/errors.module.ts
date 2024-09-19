import { Module } from '@nestjs/common';
import { FileNameValidator } from '../validators/file-name-validator';
import { WsExceptionFilter } from './ws-exception-filter';
import { HttpExceptionFilter } from './http-exception-filter';

@Module({
  providers: [WsExceptionFilter, HttpExceptionFilter, FileNameValidator],
  exports: [WsExceptionFilter, HttpExceptionFilter, FileNameValidator],
})
export class ErrorsModule {}
