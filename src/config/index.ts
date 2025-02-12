import dotenv from 'dotenv';
dotenv.config();

export const config = {
  mailer: {
    user: process.env.MAILER_USER || '',
    host: process.env.MAILER_HOST || '',
    password: process.env.MAILER_PASSWORD || '',
    noreply: process.env.NO_REPLY_ADDRESS || 'cleancode@noreply.fr',
  },
};
