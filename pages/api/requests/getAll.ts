import type { NextApiRequest, NextApiResponse } from 'next'
import { get_all_members } from '../../../dbconfig/db_members';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    get_all_members().then((response) => JSON.stringify(response)).then((response) => res.send(response));
  }