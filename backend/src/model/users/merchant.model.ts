import mongoose, { Model, Schema } from "mongoose";
import { IMerchant } from "../../utils/definitions";
import { BaseUserSchema } from "./user.model";

const MerchantSchema: Schema<IMerchant> =
  BaseUserSchema.clone() as Schema<IMerchant>;

MerchantSchema.add({
  companyName: { type: String },
  companyID: { type: String },
  companyEmail: { type: String},
  businessBankingDetails: {
    type: Schema.Types.ObjectId,
    ref: "Bank",
    default: null,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },
  ], // id of products IProduct[];
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
      default: null,
    },
  ], // id of transaction ITransaction[];
  applicationStatus: {
    type: String,
    default: "pending",
    required: true,
  },
});

const Merchant: Model<IMerchant> = mongoose.model<IMerchant>(
  "Merchant",
  MerchantSchema
);

export default Merchant;
