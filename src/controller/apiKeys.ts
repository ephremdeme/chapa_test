import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import UserModel from "../modules/users/schema";
import { asyncHandler } from "../middleware/asyncHandler";
import { ErrorResponse } from "../util/errorResponse";
import { response_status_codes } from "../middleware/errorHandler";

export const generateNewApiKey = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as { id: string };
    const user = await UserModel.findById(id);
    if (!user) {
      next(new ErrorResponse("Failed Finding a User", 404));
    }

    const salt = crypto.randomBytes(16).toString("base64");
    const newApiKey = crypto
      .createHmac("sha256", salt)
      .update(user.email.toString())
      .digest("base64");
    user.API_KEY.push(newApiKey);
    await user.save();
    res.status(200).json({ success: true, data: { ApiKey: newApiKey } });
  }
);
export const removeApiKey = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as { id: string };
    if (req.body.api_key) {
      const user = await UserModel.findById(id);
      if (!user) {
        next(new ErrorResponse("Failed Finding a User", 404));
      }

      user.API_KEY.filter((key) => key !== req.body.api_key);
      await user.save();
      res.status(200).json({ success: true, data: { ApiKeys: user.API_KEY } });
    } else {
      next(
        new ErrorResponse(
          "Api Key is required!",
          response_status_codes.bad_request
        )
      );
    }
  }
);
