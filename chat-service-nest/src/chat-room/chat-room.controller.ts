import { Controller, Get, Logger, OnModuleInit } from '@nestjs/common';
import {
  ClientKafka,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller('chat-room')
export class ChatRoomController {
  private logger = new Logger(ChatRoomController.name);

  @Get()
  healthCheck() {
    return '1';
  }

  @EventPattern('broadcast-created')
  handleBroadcastCreated(@Payload() message: any) {
    this.logger.log('reseive broadcast-created', message);
  }
}
