import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudioGateway } from './file-upload/gateways/file-upload.gateway';
import { FileService } from './file-upload/services/file.service';
import { GoogleCloudStorageService } from './file-upload/services/google-cloud-storage.service';
import { ErrorsModule } from './common/errors/errors.module';
import { FirebaseModule } from './firebase/firebase.module';
import { FirestoreService } from './firebase/firestore.service';
import { MigrationsCommand } from './commands/migrations.command';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirebaseModule,
    ErrorsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AudioGateway,
    FileService,
    FirestoreService,
    GoogleCloudStorageService,
    MigrationsCommand,
  ],
})
export class AppModule {}
