import express from "express";
import dotenv from "dotenv";
// Load environment-specific config file
if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: "../config.dev.env" });
} else if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "../config.prod.env" });
}
import { boardRouter } from "./routes/boardRoutes";
import { AppError } from "./utils/appError";
import { globalError } from "./controllers/errorController";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/boards", boardRouter);
//catch all errors for unexpected routes
app.all("*", (req, res, next) => {
  next(
    new AppError(`cannot find path: ${req.originalUrl} on the server.`, 404)
  );
});
console.log(process.env.NODE_ENV);
app.use(globalError);
