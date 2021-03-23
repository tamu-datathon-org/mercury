// Need a package that can dynamically switch between the JS `fetch`
// and the `node-fetch` based on usage.
import fetch from 'isomorphic-unfetch';
import { VercelRequest } from '@vercel/node';

export async function fetcher<JSON = unknown>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      accept: 'application/json'
    }
  });
  return res.json();
}

export const authenticatedFetch = <JSON = unknown>(input: RequestInfo, req: VercelRequest, init?: RequestInit): Promise<JSON> => {
  const { accessToken } = req.cookies;
  return fetcher(input, {
    ...init,
    headers: {
      ...init?.headers,
      Cookie: `accessToken=${accessToken}`
    }
  });
};

export const getBaseUrl = (req: VercelRequest): string => {
  const httpProto = req.headers['x-forwarded-proto'] || 'https';
  return `${httpProto}://${req.headers.host}`;
};
