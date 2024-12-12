import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
