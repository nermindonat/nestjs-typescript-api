import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/createUser.dto";
import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: "Create user"})
    @ApiResponse({ status: 201, type: CreateUserDto})
    @Post()
    async create(@Body() payload: CreateUserDto) {
        return this.userService.create(payload);
      }
}


