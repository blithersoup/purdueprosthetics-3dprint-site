import type { NextApiRequest, NextApiResponse } from "next";
import { get_member } from "../../../dbconfig/db_members";

const getMember = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body as { id: string };
  await get_member(id).then((response) => {
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
export default getMember;
