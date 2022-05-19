import type { NextApiRequest, NextApiResponse } from "next";
import { update_request } from "../../../dbconfig/db_requests";
import type { Request } from "../../../dbconfig/models";

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
    res.setHeader("Cache-Control", "max-age=180000");
    res.end(JSON.stringify(response));
  });
};
