import { Entity, Property, Filter, BeforeDelete } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { BaseEntity } from 'src/entities/base.entity';

@Filter({
  name: 'softDelete',
  cond: () => ({ deletedAt: null }),
  default: true,
})
@Entity({ abstract: true })
export abstract class TimestampedEntity extends BaseEntity {
  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ type: 'date', nullable: true })
  deletedAt?: Date;

  async softRemove(em: EntityManager) {
    this.deletedAt = new Date();
    await em.persistAndFlush(this);
  }

  @BeforeDelete()
  beforeDelete() {
    this.deletedAt = new Date();
  }
}
