import type { NextApiRequest, NextApiResponse } from "next";
import { create_request } from "../../../dbconfig/db_requests";
import { Request } from "../../../dbconfig/models";

const newRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const newReq: Request = req.body as {
    id: 1;
    name: string;
    author_id: number;
    url: string;
    dimensions: string;
    notes: string;
    material_type: string;
    second_material: string;
    stage: string;
  };
  await create_request(newReq).then((response) => {
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

export default newRequest;
