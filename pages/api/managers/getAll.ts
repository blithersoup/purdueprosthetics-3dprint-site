import type { NextApiRequest, NextApiResponse } from 'next'
import { get_all_managers } from '../../../dbconfig/db_managers';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    get_all_managers().then((response) => JSON.stringify(response)).then((response) => res.send(response));
  }