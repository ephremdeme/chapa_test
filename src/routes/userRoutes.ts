import { deleteUser, getAllUsers, getUserById } from "../controller/users";
import { Application, NextFunction, Request, Response } from "express";
import { UserRole } from "../modules/users/model";
import { authorize } from "../middleware/authorize";

export class UserRoutes {
  public route(app: Application) {
    app.get(
      "/api/users",
      authorize(UserRole.SUPER_ADMIN),
      (req: Request, res: Response, next: NextFunction) => {
        getAllUsers(req, res, next);
      }
    );
    app.get(
      "/api/users/:id",
      authorize([UserRole.SUPER_ADMIN, "OWNER"]),
      (req: Request, res: Response, next: NextFunction) => {
        getUserById(req, res, next);
      }
    );

    app.delete(
      "/api/users/:id",
      authorize([UserRole.SUPER_ADMIN, "OWNER"]),
      (req: Request, res: Response, next: NextFunction) => {
        deleteUser(req, res, next);
      }
    );
  }
}
