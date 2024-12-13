import { Module } from '@nestjs/common';
import { ChatRoomController } from './chat-room.controller';

@Module({
  controllers: [ChatRoomController],
})
export class ChatRoomModule {}
