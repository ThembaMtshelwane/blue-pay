import { Schema } from "mongoose";
import { ICustomer } from "../../utils/definitions";
import { BaseUserSchema } from "../../schema/baseSchema";

const CustomerSchema: Schema<ICustomer> =
  BaseUserSchema.clone() as Schema<ICustomer>;
