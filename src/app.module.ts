import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroConfig from '@micro-orm-config';
import { User } from 'src/entities/user.entity';
import { EnvService } from 'src/config/env.service';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroConfig),
    MikroOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService, EnvService],
  exports: [EnvService],
})
export class AppModule {}
