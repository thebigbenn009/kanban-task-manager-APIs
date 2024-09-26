import express from "express";
import {
  createBoard,
  deleteBoard,
  editBoard,
  getAllBoards,
  getBoard,
} from "../controllers/boardController";
import {
  createColumn,
  getAllColumns,
  getColumn,
} from "../controllers/columnController";
import {
  createTask,
  getAllTasks,
  getTask,
} from "../controllers/taskControllers";
export const boardRouter = express.Router();

//BOARD ROUTES
boardRouter.route("/").get(getAllBoards).post(createBoard);
boardRouter.route("/:id").get(getBoard).patch(editBoard).delete(deleteBoard);

//COLUMN ROUTES
boardRouter.route("/:boardId/columns").get(getAllColumns).post(createColumn);
boardRouter.route("/:boardId/columns/:columnId").get(getColumn);

//TASK ROUTES
boardRouter
  .route("/:boardId/columns/:columnId/tasks")
  .get(getAllTasks)
  .post(createTask);
boardRouter.route("/:boardId/columns/:columnId/tasks/:taskId").get(getTask);
