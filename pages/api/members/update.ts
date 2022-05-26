import type { NextApiRequest, NextApiResponse } from "next";
import { update_member } from "../../../dbconfig/db_members";
import type { Member } from "../../../dbconfig/models";

const updateMember = async (req: NextApiRequest, res: NextApiResponse) => {
  const newMan: Member = req.body as {
    id: 0;
    email: string;
  };

  await update_member(newMan).then((response) => {
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

export default updateMember;
