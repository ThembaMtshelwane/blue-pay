import mongoose, { Model, Schema } from "mongoose";
import { IAdmin } from "../../utils/definitions";
import { BaseUserSchema } from "./user.model";

const adminSchema: Schema<IAdmin> = BaseUserSchema.clone() as Schema<IAdmin>;

const Admin: Model<IAdmin> = mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;
