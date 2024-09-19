import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudioGateway } from './file-upload/gateways/file-upload.gateway';
import { FileService } from './file-upload/services/file.service';
import { GoogleCloudStorageService } from './file-upload/services/google-cloud-storage.service';
import { ErrorsModule } from './common/errors/errors.module';
import { FirebaseModule } from './firebase/firebase.module';
import { MigrationsService } from './commands/migrations/migrations.service';
import { MigrationsCommand } from './commands/migrations/migrations.command';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirebaseModule,
    ErrorsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AudioGateway,
    FileService,
    MigrationsService,
    GoogleCloudStorageService,
    MigrationsCommand,
  ],
})
export class AppModule {}
