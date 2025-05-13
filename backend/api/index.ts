import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";
import { PORT } from "../src/consts/env.consts";
import connectDB from "../src/config/db";
import adminRoutes from "../src/routes/admin.route";
import merchantRoutes from "../src/routes/merchant.route";
import customerRoutes from "../src/routes/customer.route";
import productRoutes from "../src/routes/product.route";
import { notFound, errorHandler } from "../src/middleware/error.middleware";

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/merchant", merchantRoutes);
app.use("/api/products", productRoutes);

app.get("/api", (req: Request, res: Response) => {
  res.send("Hello World XXX");
});

app.use(notFound);
app.use(errorHandler as unknown as express.ErrorRequestHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
