import { Request, Response, Express, NextFunction } from "express";
import UserModel from "../modules/users/schema";
import { ErrorResponse } from "../util/errorResponse";
import { response_status_codes } from "./errorHandler";

export const checkApiKey = () => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.get("api_key");
  if (!apiKey) {
    next(
      new ErrorResponse(
        "Missing api_key header",
        response_status_codes.un_authorized
      )
    );
  } else {
    try {
      const user = await UserModel.findOne({ API_KEY: apiKey });
      if (!user)
        next(
          new ErrorResponse("User Not Found!", response_status_codes.not_found)
        );
      else {
        next();
      }
    } catch (error) {
      next(error);
    }
  }
};
