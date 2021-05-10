import { Application, Request, Response } from "express";
export class ErrorRoutes {
  public route(app: Application) {
    // Mismatch URL
    app.all("*", function (req: Request, res: Response) {
      res.status(404).send({
        success: false,
        err: {
          message: "Check your URL or Method please!",
        },
      });
    });
  }
}
