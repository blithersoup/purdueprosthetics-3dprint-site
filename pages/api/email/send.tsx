import type { NextApiRequest, NextApiResponse } from "next";

const updateRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const sentReq: {
    email: string
    name: string;
    url: string;
    dimensions: string;
    notes: string;
    material_type: string;
    second_material: string;
    stage: string;
  } = req.body as {
    email: string
    name: string;
    url: string;
    dimensions: string;
    notes: string;
    material_type: string;
    second_material: string;
    stage: string;
  };
  const sg = require("@sendgrid/mail");
  sg.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: sentReq.email,
    from: "admin@purdueprosthetics.com",
    subject: `Your Print Request \"${sentReq.name}\" Has Been Updated!`,
    text: `And here it is: \nName: ${sentReq.name}\nUrl: ${sentReq.url}\nDimensions: ${sentReq.dimensions}\nNotes: ${sentReq.notes}\nMaterial Type: ${sentReq.material_type}\nSecond Material: ${sentReq.second_material}\nStage: ${sentReq.stage}\n\nCheers,\nThe Printing Team`,
    html: `<h3>And here it is: </h3><div></div><div>Name: ${sentReq.name}</div><div>Url: ${sentReq.url}</div><div>Dimensions: ${sentReq.dimensions}</div><div>Notes: ${sentReq.notes}</div><div>Material Type: ${sentReq.material_type}</div><div>Second Material: ${sentReq.second_material}</div><div>Stage: ${sentReq.stage}</div><div></div><div>Cheers,</div><div>The Printing Team</div>`,
  };
  await sg.send(msg);
  res.end();
};
export default updateRequest;
