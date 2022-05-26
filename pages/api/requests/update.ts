import type { NextApiRequest, NextApiResponse } from "next";
import { update_request } from "../../../dbconfig/db_requests";
import type { Request } from "../../../dbconfig/models";

const updateRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const newReq: Request = req.body as {
    id: number;
    name: string;
    author_id: number;
    url: string;
    dimensions: string;
    notes: string;
    material_type: string;
    second_material: string;
    stage: string;
  };

  await update_request(newReq).then((response) => {
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
export default updateRequest;
