import express from "express";
import { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
app.listen(9000, () => console.log(`Server is running on port 9000`));
