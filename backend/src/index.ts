import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";
import { PORT } from "./consts/env.consts";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.route";

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/api", (req: Request, res: Response) => {
  res.send("Hello World XXX");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
