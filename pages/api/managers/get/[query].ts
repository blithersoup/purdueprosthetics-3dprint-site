import type { NextApiRequest, NextApiResponse } from 'next'
import { get_manager } from '../../../../dbconfig/db_managers';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body as { id: string }; 
  await get_manager(id).then((response) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=180000');
    res.end(JSON.stringify(response));
  });
}