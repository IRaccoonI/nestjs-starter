import * as path from 'path';
import * as dotenv from 'dotenv';

const configName = `.env.${process.env.NODE_ENV ?? 'development'}`;

dotenv.config({
  path: path.resolve(process.cwd(), configName),
});

import { Migrator } from '@mikro-orm/migrations';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export const mikroConfig: MikroOrmModuleOptions = {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),

  driver: PostgreSqlDriver,
  entities: [path.resolve(__dirname, 'src/entities')],
  entitiesTs: [path.resolve(__dirname, 'src/entities')],
  migrations: {
    path: './migrations',
    pathTs: './migrations',
    emit: 'ts',
  },
  debug: process.env.ORM_DEBUG === 'true',
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator],
};

export default mikroConfig;
