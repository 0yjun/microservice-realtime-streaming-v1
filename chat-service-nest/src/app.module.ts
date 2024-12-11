import { Module, OnModuleInit, Injectable } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ChatModule } from '@/chat/chat.module';
import yamlConfigLoader from '@/config/yaml.config.loader';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { SpringCloudConfigService } from './config/spring.cloud.config.service';
import { AxiosResponse } from 'axios';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ChatModule,
    ConfigModule.forRoot({
      load: [yamlConfigLoader],
      isGlobal: true,
    }),
    HttpModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configservice: ConfigService,
        springCloudConfigService: SpringCloudConfigService,
      ) => {
        const springCloudConfig: Record<string, any> =
          await springCloudConfigService.getConfig();
        const db_url = springCloudConfig
          .get('spring.datasource.url')
          ?.ConfigService.get('');

        return {
          uri: springCloudConfig.get(''),
        };
      },
      inject: [ConfigService, SpringCloudConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SpringCloudConfigService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private springCloudConfigService: SpringCloudConfigService,
    private httpService: HttpService,
  ) {}
  async onModuleInit() {
    const config = await this.springCloudConfigService.getConfig();
    console.log(config);
  }
}
