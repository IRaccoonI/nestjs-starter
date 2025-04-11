import { Entity, Property } from '@mikro-orm/core';
import { TimestampedEntity } from 'src/entities/timestampedEntity.entity';

@Entity()
export class User extends TimestampedEntity {
  @Property()
  name!: string;

  @Property()
  name2!: string;
}
