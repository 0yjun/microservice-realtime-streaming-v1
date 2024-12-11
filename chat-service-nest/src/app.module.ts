import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ChatModule } from '@/chat/chat.module';
import configuration from '@/config/configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ChatModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
