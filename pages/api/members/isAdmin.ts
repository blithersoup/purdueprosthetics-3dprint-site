import type { NextApiRequest, NextApiResponse } from "next";
import { is_admin } from "../../../dbconfig/db_members";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body as { email: string };
  await is_admin(email).then((response) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("set-cookie", [
      "cookie1=value1; SameSite=Lax",
      "cookie2=value2; SameSite=None; Secure",
    ]);
    res.setHeader("Cache-Control", "max-age=180000");
    res.end(JSON.stringify(response));
  });
};
