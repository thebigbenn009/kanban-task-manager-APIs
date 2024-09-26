import mongoose, { Document } from "mongoose";

export interface TaskDocument extends Document {
  title: string;
  description: string;
  status: string;
  columnId: mongoose.Types.ObjectId;
}
