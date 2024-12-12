import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly jwtService: JwtService) {}

  async sendResetPasswordLink(email: string) {
    const payload = { email };
    const token = this.jwtService.sign(payload);
    const resetPasswordLink = `http://localhost:5173/yeni-sifre-olustur?token=${token}`;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: '"N&D" <${process.env.SMTP_USER}>',
      to: email,
      subject: 'N&D | Şifremi Unuttum',
      html: `<p>Şifrenizi sıfırlamak için lütfen aşağıdaki bağlantıyı tıklayın:</p><a href="${resetPasswordLink}">${resetPasswordLink}</a>`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error('Failed to send password reset email');
    }
  }
}
