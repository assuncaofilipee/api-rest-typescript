import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { join } from 'path';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host:
    process.env.NODE_ENV === 'test'
      ? 'postgres-test'
      : process.env.DB_POSTGRES_HOST,
  port: parseInt(process.env.DB_POSTGRES_PORT!, 10),
  username: process.env.DB_POSTGRES_USER,
  password: process.env.DB_POSTGRES_PASSWORD,
  database: process.env.NODE_ENV === 'test'
    ? 'api-rest-typescript-test-db'
    : process.env.DB_POSTGRES_NAME,
  entities: [join(__dirname, `../../../domain/entities/*{.ts,.js}`)],
  migrations: [
    process.env.NODE_ENV === 'test'
    ? `./dist/src/infrastructure/data/migrations/*.js`
    : join(__dirname, `../migrations/*{.ts,.js}`)],
  namingStrategy: new SnakeNamingStrategy()
});
