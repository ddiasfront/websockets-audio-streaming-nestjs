import { Catch, ArgumentsHost, Injectable } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Injectable()
@Catch(WsException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    const data = host.switchToWs().getData();

    const errorResponse = {
      event: 'error',
      message: exception.getError(),
      timestamp: new Date().toISOString(),
      data,
    };

    client.emit('error', errorResponse);
  }
}
