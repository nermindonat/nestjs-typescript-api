import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductVariantService } from './productVariant.service';
import { CreateProductVariantDto } from './dto';

@ApiTags('Product Variant')
@Controller('product-variant')
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @ApiOperation({ summary: 'Create product variant' })
  @ApiResponse({ status: 201, type: CreateProductVariantDto })
  @Post()
  create(@Body() createProductVariantDto: CreateProductVariantDto) {
    return this.productVariantService.create(createProductVariantDto);
  }
}
