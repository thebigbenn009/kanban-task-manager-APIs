import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Board } from "../models/boardModel";
import { AppError } from "../utils/appError";

export const getAllTasks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { boardId, columnId } = req.params;
    const board = await Board.findById(boardId);
    if (!board) {
      return next(new AppError("board does not exist", 404));
    }
    const column = board?.columns.find(
      (col) => col._id?.toString() === columnId
    );
    if (!column) {
      return next(new AppError("Column does not exist", 404));
    }
    const { tasks } = column;
    res.status(200).json({
      status: "success",
      length: tasks.length,
      data: {
        tasks,
      },
    });
  }
);
export const getTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { boardId, columnId, taskId } = req.params;
    const board = await Board.findById(boardId);
    if (!board) return next(new AppError("Board does not exist", 404));
    const column = board?.columns.find(
      (col) => col._id?.toString() === columnId
    );
    if (!column) {
      return next(new AppError("Column does not exist", 403));
    }
    const task = column.tasks.find((task) => task._id!.toString() === taskId);
    if (!task) {
      return next(new AppError("Task does not exist", 403));
    }
    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  }
);
export const createTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, status, subtasks } = req.body;
    const { boardId, columnId } = req.params;
    const board = await Board.findById(boardId);

    if (!board) return next(new AppError("Board does not exist", 404));
    const column = board?.columns.find(
      (col) => col._id!.toString() === columnId
    );
    if (!column) {
      return next(new AppError("Column does not exist", 404));
    }
    const newTask = {
      title,
      description,
      status,
      subtasks: subtasks || [],
    };
    column.tasks.push(newTask);
    await board.save();
    res.status(201).json({
      status: "success",
      data: {
        task: newTask,
      },
    });
  }
);
