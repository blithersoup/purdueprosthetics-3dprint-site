import type { NextApiRequest, NextApiResponse } from 'next'
import { create_member } from '../../../dbconfig/db_members';
import { Member } from '../../../dbconfig/models'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const newMan: Member = req.body as { id: 0, name: string, email: string, password: string, org: string }
    await create_member(newMan).then((response) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=180000');
    res.end(JSON.stringify(response))
    });
  }