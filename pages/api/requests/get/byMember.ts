import type { NextApiRequest, NextApiResponse } from 'next'
import { get_requests_by_member } from '../../../../dbconfig/db_requests';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.body as { id: string };
    await get_requests_by_member(id).then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'max-age=180000');
        res.end(JSON.stringify(response));
    });
}