import nodemailer from 'nodemailer';
import { config } from 'src/config';

const mailerconfig = config.mailer;

const transporter = nodemailer.createTransport({
  host: mailerconfig.host,
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: mailerconfig.user,
    pass: mailerconfig.password,
  },
});

export const sendMail = async (
  from: string,
  to: string,
  subject: string,
  html: string,
) => {
  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
  } catch (error) {
    throw new Error('Error sending email');
  }
};
