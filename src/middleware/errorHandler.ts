import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../util/errorResponse";

export const errorHandler =
  () => (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = { ...err };
    //Mongoose bad ObjectId

    if (err.name === "CastError") {
      const message = `Document not found with id of ${err.value}`;
      error = new ErrorResponse(message, response_status_codes.not_found);
    }
    if (err.name === "UnauthorizedError") {
      const message = `Your session has expired, Please login again!`;
      console.log("JWT Error");

      error = new ErrorResponse(message, response_status_codes.un_authorized);
    }

    if (err.name)
      res.status(error.statusCode || 500).json({
        success: false,
        error: {
          message: error.message || err.message || "Server Error",
          statusCode: error.statusCode || 500,
        },
        message: error.message || err.message || "Server Error",
        data: null,
      });
    else if (err.code)
      res.status(error.statusCode || 500).json({
        success: false,
        error: { err },
        message: error.message || err.message || "Server Error",
        data: null,
      });
  };

export enum response_status_codes {
  success = 200,
  bad_request = 400,
  internal_server_error = 500,
  un_authorized = 401,
  not_found = 404,
}
