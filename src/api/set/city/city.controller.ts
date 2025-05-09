import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CityService } from './city.service';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { City } from './entity/city.entity';

@ApiTags('cities')
@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  @ApiOperation({ summary: 'Get all cities' })
  @ApiResponse({ status: 200, type: [City] })
  findAll() {
    return this.cityService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get city by id' })
  @ApiResponse({ status: 200, type: City })
  findOne(@Param('id') id: string) {
    return this.cityService.findCityById(+id);
  }

  // @Post('seed')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('token')
  // @ApiOperation({ summary: 'Seed cities data' })
  // @ApiResponse({ status: 201 })
  // seedCities() {
  //   return this.cityService.seedCities();
  // }
}
