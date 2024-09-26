import dotenv from "dotenv";
import { readFileSync } from "fs";

import mongoose from "mongoose";
import { Board } from "../models/boardModel";
// import { Board } from "./models/boardModel.";
dotenv.config({ path: "./config.env" });

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
connectDB().then(() => {
  importData()
    .then(() => {
      console.log("Import process completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Import failed:", error);
      process.exit(1);
    });
});
//Read json file
const boards = JSON.parse(readFileSync(`${__dirname}/../data.json`, "utf-8"));
//import data into database
const importData = async () => {
  try {
    await Board.create(boards);
    console.log("Data loaded successfully");
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.connection.close();
  }
};
