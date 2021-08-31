import type { NextApiRequest, NextApiResponse } from 'next';
import Mailgun from 'mailgun-js';
import { authenticatedFetch, getBaseUrl } from '../../../libs';
import { GatekeeperRequestError, User } from '../../../components/UserProvider';

const sendEmails = (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const mailgun = Mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  });
  if (user.isAdmin) {
    return new Promise(() => {
      mailgun.messages().send(req.body, (error, body) => {
        if (error) {
          res.status(500).send(String(error));
        } else {
          res.status(200).json(body);
        }
      });
    });
  } else {
    res.status(500).send('You do not have admin permission.');
  }
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    throw new Error('MAILGUN_API_KEY or MAILGUN_DOMAIN are not defined in .env.development.local');
  }
  const response: User | GatekeeperRequestError = await authenticatedFetch(`${getBaseUrl(req)}/auth/user`, req);
  if ((response as GatekeeperRequestError).statusCode === 401) {
    res.writeHead(302, { Location: `/auth/login?r=${req.url}` }).end();
  } else {
    sendEmails(req, res, response as User);
  }
};
