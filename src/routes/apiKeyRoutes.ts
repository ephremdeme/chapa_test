import { generateNewApiKey, removeApiKey } from "../controller/apiKeys";
import { Application, NextFunction, Request, Response } from "express";
import { authorize } from "../middleware/authorize";

export class ApiKeyRoutes {
  public route(app: Application) {
    app.get(
      "/api/gen_key",
      authorize(["OWNER"]),
      (req: Request, res: Response, next: NextFunction) => {
        generateNewApiKey(req, res, next);
      }
    );
    app.post(
      "/api/revoke_key",
      authorize(["OWNER"]),
      (req: Request, res: Response, next: NextFunction) => {
        removeApiKey(req, res, next);
      }
    );
  }
}
