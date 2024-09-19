import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsExceptionFilter } from './common/errors/ws-exception-filter';
import { HttpExceptionFilter } from './common/errors/http-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter(), new WsExceptionFilter());
  app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);

  await app.listen(3000);
}
bootstrap();
