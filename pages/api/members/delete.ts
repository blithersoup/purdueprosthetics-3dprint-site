import type { NextApiRequest, NextApiResponse } from "next";
import { delete_member } from "../../../dbconfig/db_members";

const deleteMember = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body as { id: string };
  await delete_member(id).then((response) => {
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
export default deleteMember;
