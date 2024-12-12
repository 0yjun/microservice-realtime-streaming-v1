import { Module, OnModuleInit, Injectable } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ChatModule } from '@/chat/chat.module';
import yamlConfigLoader from '@/config/yaml.config.loader';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { SpringCloudConfigService } from './config/spring.cloud.config.service';

@Module({
  imports: [
    ChatModule,
    ConfigModule.forRoot({
      load: [yamlConfigLoader],
      isGlobal: true,
    }),
    HttpModule,

    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, SpringCloudConfigService],
})
export class AppModule {}
