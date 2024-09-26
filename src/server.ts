import dotenv from "dotenv";
import path from "path";
// Load environment-specific config file
const configPath = path.join(
  __dirname,
  "..",
  `config.${process.env.NODE_ENV}.env`
);
dotenv.config({ path: configPath });
import { app } from ".";
import mongoose from "mongoose";
const port = process.env.PORT;
const db = process.env.DB as string;
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(db);
    console.log("Connection to database successful");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
connectDB();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(process.env.NODE_ENV);
});
