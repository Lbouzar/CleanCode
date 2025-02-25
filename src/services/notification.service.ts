import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
    constructor(private readonly mailerService: MailerService) {}

    async sendLowStockAlert(stockName: string, quantity: number) {
        const email = "admin@test.com"; 
        const subject = `⚠️ Low Stock Alert: ${stockName}`;
        const message = `The stock item "${stockName}" is running low! Only ${quantity} left.`;

        await this.mailerService.sendMail({
            to: email,
            subject,
            text: message,
        });

        console.log(`📩 Email sent: ${subject}`);
    }
}
