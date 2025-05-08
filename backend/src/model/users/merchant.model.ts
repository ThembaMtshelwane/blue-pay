import mongoose, { Model, Schema } from "mongoose";
import { IMerchant } from "../../utils/definitions";
import { BaseUserSchema } from "../../schema/baseSchema";

const merchantSchema: Schema<IMerchant> =
  BaseUserSchema.clone() as Schema<IMerchant>;

merchantSchema.add({
  companyName: { type: String },
  companyID: { type: String },
  businessBankingDetails: {
    type: Schema.Types.ObjectId,
    ref: "Bank",
    default: null,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bank",
      default: null,
    },
  ], // id of products IProduct[];
  trnasactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
      default: null,
    },
  ], // id of transaction ITransaction[];
});

const Merchant: Model<IMerchant> = mongoose.model<IMerchant>(
  "Merchant",
  merchantSchema
);

export default Merchant;
