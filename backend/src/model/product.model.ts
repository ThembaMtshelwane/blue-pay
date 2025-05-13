import mongoose, { Model, Schema } from "mongoose";
import { IProduct } from "../utils/definitions";

export const productSchema: Schema<IProduct> = new Schema<IProduct>({
  name: { type: String },
  image: { type: String },
  price: { type: Number },
});

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);

export default Product;
