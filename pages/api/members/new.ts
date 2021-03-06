import type { NextApiRequest, NextApiResponse } from "next";
import { create_member } from "../../../dbconfig/db_members";
import { Member } from "../../../dbconfig/models";

const newMember = async (req: NextApiRequest, res: NextApiResponse) => {
  const newMan: Member = req.body as {
    id: 0;
    email: string;
  };
  await create_member(newMan).then((response) => {
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

export default newMember;
