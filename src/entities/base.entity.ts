import { PrimaryKey, Entity, wrap } from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class BaseEntity {
  @PrimaryKey()
  id!: number;

  toJSON() {
    return wrap(this).toObject();
  }
}
