import { NextFunction, Request, Response } from "express";
import UserModel from "../modules/users/schema";
import { asyncHandler } from "../middleware/asyncHandler";
import { ErrorResponse } from "../util/errorResponse";
import { response_status_codes } from "../middleware/errorHandler";

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allCards = await UserModel.find();
    res
      .status(response_status_codes.success)
      .json({ success: true, count: allCards.length, data: allCards });
  }
);

export const getUserById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      next(new ErrorResponse("Failed Finding a User", 404));
    } else {
      res
        .status(response_status_codes.success)
        .json({ success: true, data: { user } });
    }
  }
);

export const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findByIdAndDelete(req.params.id);

    if (!user) {
      next(new ErrorResponse("Failed Finding a User", 404));
    } else {
      res.status(response_status_codes.success).json({
        success: true,
        data: null,
        message: "Successfully deleted a user!",
      });
    }
  }
);
