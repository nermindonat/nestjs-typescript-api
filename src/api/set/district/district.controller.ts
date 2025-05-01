import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DistrictService } from './district.service';
import { District } from './entity/district.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('districts')
@Controller('districts')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get()
  @ApiOperation({ summary: 'Get all districts' })
  @ApiResponse({ status: 200, type: [District] })
  findAll() {
    return this.districtService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get district by id' })
  @ApiResponse({ status: 200, type: District })
  findOne(@Param('id') id: string) {
    return this.districtService.findDistrictById(+id);
  }

  @Get('city/:cityId')
  @ApiOperation({ summary: 'Get districts by city id' })
  @ApiResponse({ status: 200, type: [District] })
  findByCityId(@Param('cityId') cityId: string) {
    return this.districtService.findByCityId(+cityId);
  }

  @Post('seed')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Seed districts data' })
  @ApiResponse({ status: 201 })
  seedDistricts() {
    return this.districtService.seedDistricts();
  }
}
