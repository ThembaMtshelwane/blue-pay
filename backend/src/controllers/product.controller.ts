import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Product from "../model/product.model";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../consts/http.codes";
import HTTP_Error from "../utils/httpError";

export const addProduct = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { name, image, price, quantity } = req.body;

    const productExists = await Product.findOne({
      name,
    });

    if (productExists) {
      throw new HTTP_Error("Product already exists", BAD_REQUEST);
    }
    const product = await Product.create({
      name,
      image,
      price,
      quantity,
    });

    if (!product) {
      throw new HTTP_Error("Product not created", INTERNAL_SERVER_ERROR);
    }

    res.status(201).json({
      success: true,
      message: "Product created successfully",
    });
  }
);
