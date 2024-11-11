import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VariantService } from './variant.service';
import { CreateVariantDto } from './dto';

@ApiTags('variant')
@Controller('variant')
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  @ApiOperation({ summary: 'Create variant' })
  @ApiResponse({ status: 201, type: CreateVariantDto })
  @Post()
  create(@Body() createVariantDto: CreateVariantDto) {
    return this.variantService.create(createVariantDto);
  }
}
