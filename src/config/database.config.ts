import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host:
    process.env.NODE_ENV === 'test'
      ? process.env.DB_HOST_TEST
      : process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  synchronize: false,
  logging:
    process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test',
  migrations: [`${__dirname}/../../db/migrations/*.{js,ts}`],
  migrationsTableName: 'migrations_typeorm',
}));
