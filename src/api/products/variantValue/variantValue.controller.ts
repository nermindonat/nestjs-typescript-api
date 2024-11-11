import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VariantValueService } from './variantValue.service';
import { CreateVariantValueDto } from './dto';

@ApiTags('variant value')
@Controller('variant-value')
export class VariantValueController {
  constructor(private readonly variantValueService: VariantValueService) {}

  @ApiOperation({ summary: 'Create variant value' })
  @ApiResponse({ status: 201, type: CreateVariantValueDto })
  @Post()
  create(@Body() createVariantValueDto: CreateVariantValueDto) {
    return this.variantValueService.create(createVariantValueDto);
  }
}
