import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { eurekaClient } from './config/eureka-config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const microserviceApp =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'chat-consumer',
        },
      },
    });
  await microserviceApp.listen();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000); // HTTP 서버 포트 3000에서 실행
  await microserviceApp.listen();

  // const kafkaOption: KafkaOptions = {
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       brokers: ['localhost:9092'],
  //     },
  //     consumer: {
  //       groupId: 'chat-consumer',
  //     },
  //   },
  // };
  // const app = await NestFactory.create(AppModule);
  // app.connectMicroservice<MicroserviceOptions>({
  //   ...kafkaOption,
  // });
  // await app.listen(3000);
  try {
    eurekaClient.start();
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
