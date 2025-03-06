import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CustomerService } from '../customer/customer/customer.service';
import { RegisterDto } from './dto/register.dto';
import { MailService } from '../mail/mail.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Customer } from '../customer/customer/entity/customer.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingCustomer = await this.customerService.findOne(
      registerDto.email,
    );
    if (existingCustomer) {
      throw new BadRequestException('Customer with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newCustomer = await this.customerService.create({
      ...registerDto,
      password: hashedPassword,
    });
    const payload = { email: newCustomer.email, id: newCustomer.id };
    const token = this.jwtService.sign(payload);

    return {
      customer: newCustomer,
      token,
    };
  }

  async validateCustomer(
    email: string,
    password: string,
  ): Promise<Partial<Customer>> {
    const customer = await this.customerService.findOne(email);
    if (!customer) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const { password: _, ...result } = customer;
    return result;
  }

  async login(customer: Customer) {
    const payload = { email: customer.email, id: customer.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword(email: string) {
    const customer = await this.customerService.findOne(email);
    if (!customer) {
      throw new NotFoundException('No customer found for email');
    }
    await this.mailService.sendResetPasswordLink(email);
  }

  async resetPassword(token: string, resetPasswordDto: ResetPasswordDto) {
    const { newPassword, newPasswordAgain } = resetPasswordDto;

    if (newPassword !== newPasswordAgain) {
      throw new BadRequestException('Passwords do not match');
    }

    let payload;
    try {
      payload = this.jwtService.verify(token);
    } catch (error) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const email = payload.email;
    if (!email) {
      throw new BadRequestException('Invalid reset token');
    }

    const customer = await this.customerService.findOne(email);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    customer.password = hashedPassword;
    await this.customerService.updateCustomer(customer.id, {
      password: hashedPassword,
    });

    return { message: 'Password reset successfully' };
  }
}
