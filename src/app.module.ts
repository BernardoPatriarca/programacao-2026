import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './cases/categories/category.module';
import { ProductModule } from './cases/products/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => {
        const databaseURL = ConfigService.get<string>('DATABASE_URL');
        const databaseSCHEMA = ConfigService.get<string>('DATABASE_SCHEMA');

        if (!databaseURL) {
          throw new Error("A variável de ambiente DATABASE_URL não foi encontrada!")
        }

        if (!databaseSCHEMA) {
          throw new Error("A variável de ambiente DATABASE_SCHEMA não foi encontrada!")
        }

        return {
          type: 'postgres',
          url: databaseURL,
          schema: databaseSCHEMA,
          autoLoadEntities: true,
          synchronize: true,
          ssl: {
            rejectUnauthorized: false,
          },
        }

      }
    }),
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule { }
