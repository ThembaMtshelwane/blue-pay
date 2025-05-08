import mongoose, { Model, Schema } from "mongoose";
import { ICustomer } from "../../utils/definitions";
import { BaseUserSchema } from "./user.model";

const CustomerSchema: Schema<ICustomer> =
  BaseUserSchema.clone() as Schema<ICustomer>;

CustomerSchema.add({
  bankingDetails: {
    type: Schema.Types.ObjectId,
    ref: "Bank",
    default: null,
  },
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
      default: null,
    },
  ], // id of transaction ITransaction[];
});

const Customer: Model<ICustomer> = mongoose.model<ICustomer>(
  "Customer",
  CustomerSchema
);

export default Customer;
