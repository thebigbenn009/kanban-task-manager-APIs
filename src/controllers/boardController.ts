import { NextFunction, Request, Response } from "express";
import { Board } from "../models/boardModel";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/appError";
export const createBoard = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
  }
);
export const getAllBoards = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const boards = await Board.find();

    res.status(200).json({
      status: "success",
      data: {
        length: boards.length,
        boards,
      },
    });
  }
);
export const getBoard = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return next(new AppError("boards does not exist", 400));
    }
    res.status(200).json({
      status: "success",
      data: {
        board,
        columns: board.columns.length,
      },
    });
  }
);
export const editBoard = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, columns } = req.body;
    const board = await Board.findById(req.params.id);
    if (!board) {
      return next(new AppError("boards does not exist", 400));
    }
    board.name = name;
    //check if there is a columns array
    if (columns && Array.isArray(columns)) {
      const updatedColumns = columns.map((newCol) => {
        const existingColumn = board.columns.find(
          (col) => col._id?.toString() === newCol._id
        );
        //if the column exists, update the name
        if (existingColumn) {
          existingColumn.name = newCol.name;
          return existingColumn;
        }
        //If the column does not exist, it is a new column. Push it to the board's column array.
        else {
          //Add new column

          return { name: newCol.name, tasks: [] };
        }
      });
      board.columns = updatedColumns;
    }
    await board.save();
    res.status(200).json({
      status: "success",
      data: {
        board,
      },
    });
  }
);
export const deleteBoard = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return next(new AppError("boards does not exist", 404));
    }
    await Board.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "deleted",
      data: null,
    });
  }
);
