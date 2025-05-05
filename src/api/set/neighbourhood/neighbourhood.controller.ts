import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Neighbourhood } from './entity/neighbourhood.entity';
import { NeighbourhoodService } from './neighbourhood.service';

@ApiTags('neighbourhoods')
@Controller('neighbourhoods')
export class NeighbourhoodController {
  constructor(private readonly neighbourhoodService: NeighbourhoodService) {}

  @Get('district/:districtId')
  @ApiOperation({ summary: 'Get neighbourhoods by district id' })
  @ApiResponse({ status: 200, type: [Neighbourhood] })
  findByCityId(@Param('districtId') districtId: string) {
    return this.neighbourhoodService.findByDistrictId(+districtId);
  }
}
