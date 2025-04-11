// src/config/validated-env.ts
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvConfig } from './env.validation';
import * as dotenv from 'dotenv';
import * as path from 'path';

const configName = `.env.${process.env.NODE_ENV ?? 'development'}`;

dotenv.config({
  path: path.resolve(process.cwd(), configName),
});

const env = plainToInstance(EnvConfig, process.env, {
  enableImplicitConversion: true,
});

const errors = validateSync(env, {
  skipMissingProperties: false,
  whitelist: true,
  forbidUnknownValues: true,
});

if (errors.length > 0) {
  console.error(`${configName} file errors:`);

  errors.forEach((error) => {
    const constraints = error.constraints
      ? Object.values(error.constraints).join(', ')
      : '';
    console.error(`\t${error.property}: ${constraints}`);
  });
  process.exit(1);
}

export const validatedEnv = env;
