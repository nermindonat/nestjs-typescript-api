import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';

@Module({
  controllers: [DistrictController],
  providers: [DistrictService],
  exports: [DistrictService],
})
export class DistrictModule {} 