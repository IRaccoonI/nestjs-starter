import {
  IsEnum,
  IsString,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvConfig {
  @Type(() => Number)
  @IsNumber()
  PORT = 3000;

  @IsEnum(Environment)
  @IsNotEmpty()
  NODE_ENV: Environment = Environment.Development;

  @IsString()
  @IsNotEmpty()
  DB_NAME!: string;

  @IsString()
  @IsNotEmpty()
  DB_USER!: string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD!: string;

  @IsString()
  DB_HOST = 'localhost';

  @Type(() => Number)
  @IsNumber()
  DB_PORT = 5432;

  @Type(() => Boolean)
  @IsBoolean()
  ORM_DEBUG = false;
}
