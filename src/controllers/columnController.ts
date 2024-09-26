import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Board } from "../models/boardModel";
import { AppError } from "../utils/appError";
export const getAllColumns = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { boardId } = req.params;
    const board = await Board.findById(boardId);
    const columns = board?.columns;
    res.status(200).json({
      status: "success",
      columns,
    });
  }
);
export const getColumn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { boardId, columnId } = req.params;
    const board = await Board.findById(boardId);
    if (!board) return next(new AppError("Board does not exist", 404));
    const column = board?.columns.find(
      (col) => col._id?.toString() === columnId
    );
    if (!column) {
      return next(new AppError("Column does not exist", 403));
    }
    res.status(200).json({
      status: "success",
      data: {
        column,
      },
    });
  }
);
export const createColumn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { boardId } = req.params;
    const { name } = req.body;
    // Find board by ID
    const board = await Board.findById(boardId);
    if (!board) {
      return next(new AppError("Board not found", 400));
    }

    // Check if column with the same name already exists
    const columnExists = board.columns.some(
      (column) => column.name.toLowerCase() === name.toLowerCase()
    );
    if (columnExists) {
      return next(
        new AppError("A column with this name already exists in the board", 400)
      );
    }
    //create a new column
    const newColumn = {
      name,
      tasks: [],
    };
    //  Add the new column to the board
    board.columns.push(newColumn);
    await board.save();
    res.status(201).json({
      status: "success",
      data: {
        newColumn,
      },
    });
  }
);
