import { Controller, Post, UseGuards, Request } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { LoginDto } from "./dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @ApiBody({ type: LoginDto })
    @Post('login')
    async login(@Request() req){
        return this.authService.login(req.user)
    }

    // @UseGuards(AuthGuard('jwt'))
    // @Get('user-info')
    // getUserInfo(@Request() req) {
    //   return req.user;
    // }
}
