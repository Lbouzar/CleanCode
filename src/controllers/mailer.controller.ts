import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from 'src/services/mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  async sendMail(@Body() body: { to: string; subject: string; text: string }) {
    return this.mailerService.sendMail(body.to, body.subject, body.text);
  }
}
