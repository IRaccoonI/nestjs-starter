import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { EnvService } from 'src/config/env.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>,
    private readonly em: EntityManager,
    private readonly env: EnvService,
  ) {}

  async getHello(): Promise<string> {
    const user = await this.userRepo.findOne({ id: 1 });

    if (!user) {
      return '';
    }

    await this.em.removeAndFlush(user);

    return 'Hello World!';
  }
}
