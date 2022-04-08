import type { NextApiRequest, NextApiResponse } from 'next'
import { get_manager } from '../../../../dbconfig/db_managers';
import { useRouter } from "next/router";
import { ParsedUrlQuery } from 'querystring';
import { setRevalidateHeaders } from 'next/dist/server/send-payload';
import { truncate } from 'fs';

export const config = {
  api: {
    externalResolver: true,
  },
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body as { id: string }; 
  await get_manager(id).then((response) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'max-age=180000');
    res.end(JSON.stringify(response));
  });
}