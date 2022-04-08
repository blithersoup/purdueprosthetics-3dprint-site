import type { NextApiRequest, NextApiResponse } from 'next'
import { update_manager } from '../../../../dbconfig/db_managers';
import type { Manager } from '../../../../dbconfig/models'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const newMan: Manager = req.body as { id: 0, name: string, email: string, password: string, org: string }

  await update_manager(newMan).then((response) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=180000');
    res.end(JSON.stringify(response));
  });
}