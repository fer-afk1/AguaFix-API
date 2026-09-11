import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { envs } from '../config/envs';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envs.mailHost,
      port: envs.mailPort,
      secure: envs.mailSecure,
      auth: {
        user: envs.mailUser,
        pass: envs.mailPassword,
      },
    });
  }

  async sendEmail(to: string, subject: string, template: string): Promise<void> {
    await this.transporter.sendMail({
      from: envs.mailFrom,
      to,
      subject,
      html: template,
    });
    this.logger.log(`Correo enviado a ${to} - asunto: ${subject}`);
  }
}