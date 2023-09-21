import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { join } from 'path';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_POSTGRES_HOST,
  port: parseInt(process.env.DB_POSTGRES_PORT!, 10),
  username: process.env.DB_POSTGRES_USER,
  password: process.env.DB_POSTGRES_PASSWORD,
  database: process.env.DB_POSTGRES_NAME,
  entities: [join(__dirname, `../../../domain/entities/*{.ts,.js}`)],
  migrations: [join(__dirname, `../migrations/*{.ts,.js}`)],
  namingStrategy: new SnakeNamingStrategy()
});
