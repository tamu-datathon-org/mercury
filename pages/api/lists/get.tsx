import type { NextApiRequest, NextApiResponse } from 'next';
import Mailgun from 'mailgun-js';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const headers = res.getHeaders();
  if (!headers || !headers['x-mercury-api-key']) {
    throw new Error('MERCURY_API_KEY missing or invalid .env.development.local');
  }
  if (headers['x-mercury-api-key'] != process.env.MERCURY_API_KEY) {
    return new Promise(() => {
      res.status(500).send('MERCURY_API_KEY is not valid');
    });
  }
  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    throw new Error('MAILGUN_API_KEY or MAILGUN_DOMAIN are not defined in .env.development.local');
  }
  const mailgun = Mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  });
  return new Promise(() => {
    mailgun.get('/lists/pages', (error, body) => {
      if (error) {
        res.status(500).send(String(error));
      } else {
        res.status(200).json(body);
      }
    });
  });
};
