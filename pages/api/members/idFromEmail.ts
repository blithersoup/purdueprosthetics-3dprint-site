import type { NextApiRequest, NextApiResponse } from "next";
import { get_id_from_email } from "../../../dbconfig/db_members";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body as { email: string };
  await get_id_from_email(email).then((response) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "max-age=180000");
    res.end(JSON.stringify(response));
  });
};
