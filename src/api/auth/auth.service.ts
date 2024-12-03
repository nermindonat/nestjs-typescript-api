import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userSevice: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userSevice.findOne(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = await this.userSevice.create({
      ...registerDto,
      password: hashedPassword,
    });
    const payload = { email: newUser.email, id: newUser.id };
    const token = this.jwtService.sign(payload);

    return {
      user: newUser,
      token,
    };
  }

  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.userSevice.findOne(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
