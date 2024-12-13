import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: ['chat'] })
export class ChatGateway {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('client connect', client.id);
  }

  @SubscribeMessage('message')
  handleMessage() {}
}
