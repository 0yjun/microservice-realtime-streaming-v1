import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { client } from './config/eureka-config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'chat-consumer',
        },
      },
    },
  );
  await app.listen();
  try {
    client.start();
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
