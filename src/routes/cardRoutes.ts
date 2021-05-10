import { Application, NextFunction, Request, Response } from "express";
import { checkApiKey } from "../middleware/checkApiKey";
import {
  deleteCard,
  getAllCreditCards,
  getCreditCardById,
  storeCard,
} from "../controller/creditCards";

export class CardRoutes {
  public route(app: Application) {
    app.get(
      "/api/cards",
      checkApiKey(),
      (req: Request, res: Response, next: NextFunction) => {
        getAllCreditCards(req, res, next);
      }
    );
    app.get(
      "/api/cards/:id",
      checkApiKey(),
      (req: Request, res: Response, next: NextFunction) => {
        getCreditCardById(req, res, next);
      }
    );
    app.post(
      "/api/cards/",
      checkApiKey(),
      (req: Request, res: Response, next: NextFunction) => {
        storeCard(req, res, next);
      }
    );
    app.delete(
      "/api/cards/:id",
      checkApiKey(),
      (req: Request, res: Response, next: NextFunction) => {
        deleteCard(req, res, next);
      }
    );
  }
}
