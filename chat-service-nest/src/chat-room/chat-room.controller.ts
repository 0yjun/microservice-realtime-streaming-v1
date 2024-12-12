import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('chat-room')
export class ChatRoomController {
  private logger = new Logger(ChatRoomController.name);

  @MessagePattern('broadcsast-created')
  handleBroadcastCreated(@Payload() message: any) {
    this.logger.log('reseive broadcast-created', message);
  }
}
