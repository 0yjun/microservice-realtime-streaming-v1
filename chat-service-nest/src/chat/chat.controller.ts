import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('chat')
export class ChatController {
  constructor(private configService: ConfigService) {}
  @Get('health-check')
  getHealthCheck(): string {
    const ymlport = this.configService.get<any>('config');
    console.log(ymlport);
    return '1234';
  }
}
