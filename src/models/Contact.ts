import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { UserType } from "../types";

export interface IContact extends Document {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  user: UserType;
  _id: ObjectId;
}

const contactSchema = new Schema<IContact>(
  {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IContact>("Contact", contactSchema);
