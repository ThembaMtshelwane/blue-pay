import mongoose, { Model, Schema } from "mongoose";
import { ICustomer } from "../../utils/definitions";
import { BaseUserSchema } from "../../schema/baseSchema";

const CustomerSchema: Schema<ICustomer> =
  BaseUserSchema.clone() as Schema<ICustomer>;

const Customer: Model<ICustomer> = mongoose.model<ICustomer>(
  "Customer",
  CustomerSchema
);

export default Customer;
