import { ConfigService } from '@nestjs/config';
const Eureka = require('eureka-js-client').Eureka;

const configService = new ConfigService();
const eurekaHost = configService.get<string>('EUREKA_HOST');
const eurekaPort = configService.get<number>('EUREKA_HOST');

const clientPort = Math.random();
const clientHost = configService.get<string>('server.host');
const clientName = configService.get<string>('CLIENT_NAME');

export const client = new Eureka({
  instance: {
    app: 'nodejs-service',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: {
      $: 3000,
      '@enabled': 'true',
    },
    vipAddress: 'nodejs-service',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/',
  },
});
