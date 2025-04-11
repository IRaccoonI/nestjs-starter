import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/postgresql';
import { mikroConfig } from '@micro-orm-config';
import { EnvService } from './config/env.service'; // Добавляем EnvService
import { Environment } from 'src/config/env.validation';

async function bootstrap() {
  const envService = new EnvService(); // Инициализируем EnvService

  // Используем EnvService вместо process.env
  const nodeEnv = envService.get('NODE_ENV');
  const port = envService.get('PORT');

  const orm = await MikroORM.init(mikroConfig);

  if (nodeEnv === Environment.Development) {
    await orm.getSchemaGenerator().updateSchema();
  }

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('Auto-generated API docs')
    .setVersion('1.0')
    .build();

  //@ts-ignore несовместимые версии
  const document = SwaggerModule.createDocument(app, config);
  //@ts-ignore
  SwaggerModule.setup('api', app, document);

  // Слушаем с использованием значения из EnvService
  await app.listen(port ?? 3000);
}

bootstrap().catch((e: unknown) => {
  console.error(e);
});
