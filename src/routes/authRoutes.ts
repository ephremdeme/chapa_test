import { loginUser, registerUser } from "../controller/auth";
import { Application, NextFunction, Request, Response } from "express";

export class AuthRoutes {
  public route(app: Application) {
    app.post(
      "/api/auth/register",
      (req: Request, res: Response, next: NextFunction) => {
        registerUser(req, res, next);
      }
    );
    app.post(
      "/api/auth/login",
      (req: Request, res: Response, next: NextFunction) => {
        loginUser(req, res, next);
      }
    );
  }
}
