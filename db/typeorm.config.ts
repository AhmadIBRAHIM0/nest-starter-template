import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

console.log('ConfigService', configService.get('DB_USER'));

const dataSource: DataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  port: configService.get('DB_PORT'),
  database: configService.get('DB_NAME'),
  entities: [`${__dirname}/../src/**/entities/*.entity.{js,ts}`],
  // synchronize: configService.get('NODE_ENV') === 'development' || configService.get('NODE_ENV') === 'test',
  synchronize: false,
  // logging: configService.get('NODE_ENV') === 'development' || configService.get('NODE_ENV') === 'test',
  logging: false,
  migrations: [`${__dirname}/migrations/*.{js,ts}`],
  migrationsTableName: 'migrations',
});

export default dataSource;
