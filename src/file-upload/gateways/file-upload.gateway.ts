import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { FileService } from '../services/file.service';
import { UseFilters } from '@nestjs/common';
import { WsExceptionFilter } from 'src/common/errors/ws-exception-filter';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseFilters(WsExceptionFilter)
export class AudioGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly fileService: FileService) {}
  @SubscribeMessage('audio-stream')
  handleAudioStream(@MessageBody() audioData: any, client: Socket) {
    console.log('Received audio data:', audioData);

    // this.server.emit('audio-stream-broadcast', audioData);

    return { event: 'audio-stream', data: 'Audio received successfully' };
  }

  @SubscribeMessage('start')
  async handleStartStream(
    @MessageBody() data: { fileName: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      const { fileName } = data;
      const uploadUrl = await this.fileService.startResumableUpload(fileName);
      client.emit('uploadUrl', { uploadUrl });
      console.log(`Started resumable upload for file: ${data.fileName}`);
    } catch (error) {
      console.error('Error starting upload:', error);
      client.emit('startError', { message: 'Failed to start upload', error });
    }
  }
}
