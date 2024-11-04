import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { UpdateUserDto } from './dto';
import { JwtAuthGuard } from '../auth/guards';

// Controller, uygulamanızın gelen istekleri (HTTP isteklerini) alıp yönettiği yerdir.
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get user information detail' })
  @ApiResponse({ status: 200, type: User })
  @Get('user-detail')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  findOne(@Request() req): Promise<User> {
    return this.userService.findOne(req.user.email);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: CreateUserDto })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ type: User })
  findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 201, type: User })
  updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ type: User })
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(+id);
  }
}
