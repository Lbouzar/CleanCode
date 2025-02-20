import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerService } from 'src/services/mailer.service';
import { MailerController } from 'src/controllers/mailer.controller';

@Module({
  imports: [ConfigModule],
  providers: [MailerService],
  controllers: [MailerController],
  exports: [MailerService],
})
export class MailerModule {}
