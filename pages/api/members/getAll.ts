import type { NextApiRequest, NextApiResponse } from 'next'
import { get_all_members } from '../../../dbconfig/db_members';

export const config = {
  api: {
    externalResolver: true,
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  get_all_members().then((response) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=180000');
    res.status(200).end(JSON.stringify(response));
  });
}