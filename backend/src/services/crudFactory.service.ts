import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import HttpError from "../utils/httpError";
import { NOT_FOUND, OK } from "../consts/http.codes";
import { Model } from "mongoose";
import { IProduct } from "../utils/definitions";

// Delete one product
const deleteOneProduct = (Model: Model<IProduct>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const product = await Model.findByIdAndDelete(req.params.id);

    if (!product) {
      return next(new HttpError("No product found with that ID", NOT_FOUND));
    }

    res.status(OK).json({
      status: "product deleted successfully",
    });
  });

// Update one product
const updateOneProduct = (Model: Model<IProduct>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const product = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return next(new HttpError("No product found with that ID", NOT_FOUND));
    }

    res.status(OK).json({
      status: "product updated successfully",
      data: {
        product,
      },
    });
  });

// Get one product
const getOneProduct = (Model: Model<IProduct>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const product = await Model.findById(req.params.id);

    if (!product) {
      return next(new HttpError("No product found with that ID", NOT_FOUND));
    }

    res.status(OK).json({
      status: "success",
      id: req.params.id,
      product,
    });
  });

// Get all products
const getAllProducts = (Model: Model<IProduct>) =>
  asyncHandler(async (req: Request, res: Response) => {
    const products = await Model.find();

    res.status(OK).json({
      status: "success",
      result: products.length,
      data: {
        products,
      },
    });
  });

export {
  getAllProducts,
  updateOneProduct,
  deleteOneProduct,
  getOneProduct
};
