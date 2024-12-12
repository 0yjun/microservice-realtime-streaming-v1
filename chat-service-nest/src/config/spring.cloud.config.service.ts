import { HttpService } from '@nestjs/axios';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { response } from 'express';

@Injectable()
export class SpringCloudConfigService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getConfig(): Promise<Record<string, any>> {
    const cloud_config_url = this.configService.get<string>(
      'spring.cloud.config.url',
    );
    const cloud_config_name = this.configService.get<string>(
      'spring.cloud.config.name',
    );
    const SPRING_ACTIVE = this.configService.get<string>('spring.active');

    let result: Record<string, any> = null;
    await this.httpService.axiosRef
      .get(`${cloud_config_url}/${cloud_config_name}/${SPRING_ACTIVE}`)
      .then((response: AxiosResponse) => {
        result = this.parse(response);
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  }

  parse(response: AxiosResponse): Record<string, any> {
    return response?.data?.propertySources[0]?.source;
  }
}
