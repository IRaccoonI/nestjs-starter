// src/config/env.service.ts
import { Injectable } from '@nestjs/common';
import { validatedEnv } from './validated-env';
import { EnvConfig } from 'src/config/env.validation';

@Injectable()
export class EnvService {
  private readonly config = validatedEnv;

  get<K extends keyof EnvConfig>(key: K): EnvConfig[K] {
    return this.config[key];
  }
}
