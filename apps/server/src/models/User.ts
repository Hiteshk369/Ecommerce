import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  admin: boolean;
  avatar: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    admin: {
      type: Boolean,
      default: false,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
