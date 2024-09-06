import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudioGateway } from './audio-streaming/audio-streaming.gateway';
import { FileService } from './audio-streaming/services/file.service';
import { GoogleCloudStorageService } from './audio-streaming/services/google-cloud-storage.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AudioGateway, FileService, GoogleCloudStorageService],
})
export class AppModule {}
