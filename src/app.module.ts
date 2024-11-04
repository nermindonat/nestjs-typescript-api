import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { DBModule } from './database/db.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'assets', 'uploads'), // uploads klasörünüzün yolunu belirtiyoruz
      serveRoot: '/uploads', // http://localhost:3000/uploads şeklinde de erişiyoruz
    }),
    ApiModule,
    DBModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
