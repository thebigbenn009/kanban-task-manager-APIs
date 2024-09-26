import { NextFunction, Request } from "express";
import { Board, BoardDocument, Column, Task } from "./models/boardModel";
import { AppError } from "./utils/appError";

export const getBoardColumnTask = async (
  req: Request,
  next: NextFunction,
  includeTask: boolean = false
) => {
  const { boardId, columnId, taskId } = req.params;

  const board = await Board.findById(boardId);
  if (!board) return next(new AppError("Board does not exist", 404));

  const column = board.columns.find((col) => col._id!.toString() === columnId);
  if (!column) return next(new AppError("Column does not exist", 404));

  let task;
  if (includeTask) {
    task = column.tasks.find((task) => task._id!.toString() === taskId);
    if (!task) return next(new AppError("Task does not exist", 404));
  }

  return { board, column, task };
};
