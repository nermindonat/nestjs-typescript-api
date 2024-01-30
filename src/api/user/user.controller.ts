import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/createUser.dto";
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entity/user.entity";
import { UpdateUserDto } from "./dto";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    findAll() {
      return this.userService.findAll();
    }

    @ApiOperation({ summary: "Create user"})
    @ApiResponse({ status: 201, type: CreateUserDto})
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
      }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({ type: User })
    findWarehouseDefinitionsById(@Param('id') id: string): Promise<User> {
      return this.userService.findUserById(+id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a user'})
    @ApiResponse({ status: 201, type: User})
    updateUser(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
      return this.userService.updateUser(+id, data)
    }
}


