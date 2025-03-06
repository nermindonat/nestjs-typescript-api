import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Customer } from 'src/api/customer/customer/entity/customer.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<Partial<Customer>> {
    const customer = await this.authService.validateCustomer(email, password);
    if (!customer) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return customer;
  }
}
