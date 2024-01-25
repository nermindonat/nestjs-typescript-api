import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { DBModule } from './database/db.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true}), 
    ApiModule, 
    DBModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
