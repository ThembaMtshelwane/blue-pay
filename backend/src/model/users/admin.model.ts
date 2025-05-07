import { Schema } from "mongoose";
import { IAdmin } from "../../utils/definitions";
import { BaseUserSchema } from "../../schema/baseSchema";
("../../schema/baseSchema");

const adminSchema: Schema<IAdmin> = BaseUserSchema.clone() as Schema<IAdmin>;
