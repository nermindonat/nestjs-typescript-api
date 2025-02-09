import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { Product } from './entity/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 201, type: CreateProductDto })
  @Post()
  @ApiConsumes('multipart/form-data') // multipart/form-data kullanarak dosya yüklemesini belirtiyoruz
  @ApiBody({
    description: 'Product creation',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        price: { type: 'number' },
        description: { type: 'string' },
        variantValueIds: {
          type: 'array',
          items: {
            type: 'integer',
          },
        },
        image: {
          type: 'string',
          format: 'binary', // Swagger'da dosya yükleme alanı oluşturur
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/assets/uploads', // Yüklenen dosyaların kaydedileceği dizini belirtiyoruz.
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4() + extname(file.originalname);
          cb(null, uniqueSuffix);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files can be uploaded!'), false);
        }
        cb(null, true);
      },
    }),
  )
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const image = file ? file.filename : null;
    return this.productService.create(createProductDto, image);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ type: Product })
  findProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.findProductById(+id);
  }
}
