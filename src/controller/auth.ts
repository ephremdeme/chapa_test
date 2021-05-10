import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { response_status_codes } from "../middleware/errorHandler";
import UserModel from "../modules/users/schema";
import { asyncHandler } from "../middleware/asyncHandler";
import { ErrorResponse } from "../util/errorResponse";
import { IUser, UserRole } from "../modules/users/model";
import generateJwtToken from "../util/generateJwtToken";

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (email && password) {
      let salt = crypto.randomBytes(16).toString("base64");
      const userParms: Partial<IUser> = {
        email: email,
        password: await bcrypt.hash(password, 10),
        role: UserRole.DEVELOPER,
        API_KEY: [
          crypto.createHmac("sha256", salt).update(email).digest("hex"),
        ],
      };
      const newUser = await UserModel.create(userParms);
      const token = generateJwtToken(newUser);
      res.status(response_status_codes.success).json({
        success: true,
        messsage: "Successfully Registered.",
        data: { user: newUser, token: token },
      });
    } else {
      next(
        new ErrorResponse(
          "Email and Password are required!",
          response_status_codes.bad_request
        )
      );
    }
  }
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (email && password) {
      const user = await UserModel.findOne({ email: email });
      if (!user || !bcrypt.compareSync(password, user.password as string)) {
        next(
          new ErrorResponse(
            "Email or Password is incorrect",
            response_status_codes.bad_request
          )
        );
      }
      const token = generateJwtToken(user);
      res.status(response_status_codes.success).json({
        success: true,
        messsage: "Successfully Logged In.",
        data: { user: user, token: token },
      });
    } else {
      next(
        new ErrorResponse(
          "Email and Password are required!",
          response_status_codes.bad_request
        )
      );
    }
  }
);
