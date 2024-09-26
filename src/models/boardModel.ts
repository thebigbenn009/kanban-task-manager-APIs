import mongoose, { Document, Schema, Model, Types } from "mongoose";

// Subtask Interface
export interface Subtask {
  _id?: Types.ObjectId;
  title: string;
  isCompleted: boolean;
}

// Task Interface
export interface Task {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

// Column Interface
export interface Column {
  _id?: Types.ObjectId;
  name: string;
  tasks: Task[];
}

// Board Document Interface
export interface BoardDocument extends Document {
  name: string;
  userId: mongoose.Types.ObjectId;
  columns: Column[];
}

// Subtask schema
const subtaskSchema = new Schema<Subtask>({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

//Task Schema
export const taskSchema = new Schema<Task>({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, default: "", required: true },
  subtasks: [subtaskSchema],
});
//Column Schema
const columnSchema = new Schema<Column>({
  name: { type: String, required: true },
  tasks: [taskSchema],
});
//Board Schema
const boardSchema = new Schema<BoardDocument>({
  name: { type: String, required: true },
  // userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  columns: [columnSchema],
});

//Middleware to capitalize the first letter before saving the document
columnSchema.pre("save", function (next) {
  if (this.name) {
    this.name =
      this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
  }
  next();
});
export const Board: Model<BoardDocument> = mongoose.model<BoardDocument>(
  "Board",
  boardSchema
);
