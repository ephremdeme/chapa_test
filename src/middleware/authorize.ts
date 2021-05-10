import { Request, Response, Express, NextFunction } from "express";
import jwt from "express-jwt";
import UserModel from "../modules/users/schema";
import { ErrorResponse } from "../util/errorResponse";
import { response_status_codes } from "./errorHandler";

export function authorize(roles: string | string[] = []) {
  if (typeof roles === "string") roles = [roles];
  return [
    jwt({
      secret: Buffer.from(process.env.ACCESS_TOKEN_SECRET, "base64"),
      algorithms: ["HS256"],
      credentialsRequired: true,
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const { id, email } = req.user as { id: string; email: string };

      const user = await UserModel.findById(id);

      if (!user) {
        next(
          new ErrorResponse("User Not Found!", response_status_codes.not_found)
        );
      } else if (roles.includes("OWNER") && email !== user.email) {
        next(
          new ErrorResponse(
            "UnAuthorized Access!",
            response_status_codes.un_authorized
          )
        );
      } else if (
        user &&
        roles.length &&
        !roles.includes(user.role.toString())
      ) {
        next(
          new ErrorResponse(
            "UnAuthorized Access!",
            response_status_codes.un_authorized
          )
        );
      }
      next();
    },
  ];
}
