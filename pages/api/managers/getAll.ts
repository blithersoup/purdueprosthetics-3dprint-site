import type { NextApiRequest, NextApiResponse } from 'next'
import { get_all_managers } from '../../../dbconfig/db_managers';

export const config = {
  api: {
    externalResolver: true,
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  get_all_managers().then((response) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=180000');
    res.status(200).end(JSON.stringify(response));
  });
}