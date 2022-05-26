import type { NextApiRequest, NextApiResponse } from "next";
import { get_id_from_email } from "../../../dbconfig/db_members";

const getIdFromEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body as { email: string };
  await get_id_from_email(email).then((response) => {
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

export default getIdFromEmail;
