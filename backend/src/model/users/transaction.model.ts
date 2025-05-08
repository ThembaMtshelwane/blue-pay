import mongoose, { Model, Schema } from "mongoose";
import { ITransaction } from "../../utils/definitions";

const TransactionSchema: Schema<ITransaction> = new Schema<ITransaction>({
  amount: { type: Number },
  currency: { type: String }, // e.g., 'ZAR', 'USD'
  date: { type: Date }, // ISO 8601 date string
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
  },
  customerId: { type: String }, // Customer ID reference
  merchantId: { type: String }, // Merchant ID reference
  description: { type: String },
  paymentMethod: { type: String, enum: ["card", "eft", "wallet"] },
  reference: { type: String },
});

const Transaction: Model<ITransaction> = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);

export default Transaction;
