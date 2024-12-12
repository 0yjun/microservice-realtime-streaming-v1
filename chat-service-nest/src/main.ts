import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { client } from './config/eureka-config';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {},
  );
  await app.listen();
  try {
    client.start();
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
