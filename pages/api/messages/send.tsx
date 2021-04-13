import type { NextApiRequest, NextApiResponse } from 'next';
import Mailgun from 'mailgun-js';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    throw new Error('MAILGUN_API_KEY or MAILGUN_DOMAIN are not defined in .env.development.local');
  }
  const mailgun = Mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  });
  return new Promise(() => {
    mailgun.messages().send(req.body, (error, body) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(body);
      }
    });
  });
};
