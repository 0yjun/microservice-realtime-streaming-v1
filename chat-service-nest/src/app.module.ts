import { Module, OnModuleInit, Injectable } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ChatModule } from '@/chat/chat.module';
import yamlConfigLoader from '@/config/yaml.config.loader';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { SpringCloudConfigService } from './config/spring.cloud.config.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatRoomController } from './chat-room/chat-room.controller';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ChatModule,
    ConfigModule.forRoot({
      load: [yamlConfigLoader],
      isGlobal: true,
    }),
    HttpModule,
    ClientsModule.register([
      {
        name: 'chat-service',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'chat',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'chat-consumer',
          },
        },
      },
    ]),
    MongooseModule.forRoot('mongodb://localhost:27017'),
    ChatRoomModule,
  ],
  controllers: [AppController, ChatRoomController],
  providers: [AppService, SpringCloudConfigService],
})
export class AppModule {}
