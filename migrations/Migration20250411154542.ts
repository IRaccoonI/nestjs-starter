import { Migration } from '@mikro-orm/migrations';

export class Migration20250411154542 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" serial primary key, "created_at" date not null, "updated_at" date not null, "deleted_at" date null, "name" varchar(255) not null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user" cascade;`);
  }

}
