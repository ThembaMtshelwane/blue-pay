import { Schema } from "mongoose";
import { IBankingDetails, IBillingAddress } from "../utils/definitions";

export const bankSchema: Schema<IBankingDetails> = new Schema<IBankingDetails>({
  bankName: { type: String },
  accountNumber: { type: String },
  accountType: { type: String, enum: ["Savings", "Current"] },
  branchCode: { type: String },
  cardNumber: { type: String },
  expiryDate: { type: String },
  billingAddress: {
    type: {
      street: { type: String },
      city: { type: String },
      province: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
  },
});
