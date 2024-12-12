import mongoose, { Schema, Model } from "mongoose";

import { IAdmin } from "@entities/Iadmin";
const adminSchema = new Schema<IAdmin>({
  email: { type: String, default: "admin@solostack.online" },
  password: { type: String, default: "admin@123" },
});

export const ObjectId = mongoose.Types.ObjectId;
const adminModel: Model<IAdmin> = mongoose.model<IAdmin>(
  "admin",
  adminSchema
);

export default adminModel;
