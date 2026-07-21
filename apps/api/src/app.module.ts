import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { DatabaseSeederService } from './database/database-seeder.service';
import { Evaluation } from './evaluations/evaluation.entity';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { Supplier } from './suppliers/supplier.entity';
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (): DataSourceOptions => ({
        type: 'mysql',
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? 3306),
        username: process.env.DB_USER ?? 'ncc_user',
        password: process.env.DB_PASSWORD ?? 'ncc_pass',
        database: process.env.DB_NAME ?? 'ncc_db',
        entities: [Supplier, Evaluation],
        synchronize: process.env.DB_SYNC !== 'false',
        charset: 'utf8mb4_unicode_ci',
      }),
    }),
    TypeOrmModule.forFeature([Supplier, Evaluation]),
    SuppliersModule,
    EvaluationsModule,
  ],
  providers: [DatabaseSeederService],
})
export class AppModule {}
