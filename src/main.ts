import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsExceptionFilter } from './common/errors/ws-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new WsExceptionFilter());
  app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);

  await app.listen(3000);
}
bootstrap();
