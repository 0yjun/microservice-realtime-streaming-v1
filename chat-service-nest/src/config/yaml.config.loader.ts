import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export default function yamlConfigLoader() {
  const YAML_CONFIG_FILENAME =
    process.env.YAML_CONFIG_FILENAME || 'application.yml';
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
}
