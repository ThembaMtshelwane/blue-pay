import mongoose, { Model, Schema } from "mongoose";
import { IBaseUser } from "../../utils/definitions";
import bcrypt from "bcryptjs";

export const BaseUserSchema: Schema<IBaseUser> = new Schema<IBaseUser>(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Enter a password"],
      default: process.env.USER_PASSWORD || "",
    },
  },
  { timestamps: true }
);

BaseUserSchema.pre<IBaseUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

BaseUserSchema.methods.matchPassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User: Model<IBaseUser> = mongoose.model<IBaseUser>(
  "User",
  BaseUserSchema
);

export default User;
