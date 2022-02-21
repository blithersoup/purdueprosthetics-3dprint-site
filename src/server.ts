import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({
    hello: "world",
  });
});

app.listen(8000, () => {
  console.log("Example app listening on port 800!!!! :)");
});
