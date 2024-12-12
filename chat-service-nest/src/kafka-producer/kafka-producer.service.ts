import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  constructor(private readonly kafkaClient: ClientKafka) {}
  private readonly logger = new Logger(KafkaProducerService.name);

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async sendEvent(topic: string, message: any) {
    this.logger.log('');
  }
}
