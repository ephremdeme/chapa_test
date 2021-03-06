import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import jwt from "express-jwt";
import dotenv from "dotenv";
import path from "path";

import { CardRoutes } from "../routes/cardRoutes";
import { UserRoutes } from "../routes/userRoutes";
import { ApiKeyRoutes } from "../routes/apiKeyRoutes";
import { AuthRoutes } from "../routes/authRoutes";
import { ErrorRoutes } from "../routes/errorRoutes";

class App {
  private cardRoutes: CardRoutes = new CardRoutes();
  private userRoutes: UserRoutes = new UserRoutes();
  private authRoutes: AuthRoutes = new AuthRoutes();
  private apiKeyRoutes: ApiKeyRoutes = new ApiKeyRoutes();
  private errorRoutes: ErrorRoutes = new ErrorRoutes();

  public app: Application;
  public mongoUrl: string;

  constructor() {
    dotenv.config();

    this.app = express();
    this.mongoUrl =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URL
        : process.env.LOCAL_MONGO_URL;
    this.config();
    this.cardRoutes.route(this.app);
    this.userRoutes.route(this.app);
    this.apiKeyRoutes.route(this.app);
    this.authRoutes.route(this.app);
    this.app.get("/", (req, res) => {
      const oo = path.join(
        __dirname.substring(0, __dirname.length - 6),
        "public/index.html"
      );
      res.sendFile(oo);
    });

    this.app.get("/about", (req, res) => {
      res.send({
        Author: "Ephrem Demelash",
        Github: "github.com/ephremdeme",
        Email: "demelashephrem@gmail.com",
        LinkedIn: "linkedin.com/in/ephrem-demelash/",
      });
    });
    // this.errorRoutes.route(this.app);
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());

    const oo = path.join(
      __dirname.substring(0, __dirname.length - 6),
      "public"
    );
    console.log(__dirname, oo);
    this.app.use(express.static(oo));

    this.mongoSetup();
  }

  private mongoSetup(): void {
    mongoose
      .connect(this.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => console.log("Database Connected"))
      .catch((err) => console.log(err));
    mongoose.set("debug", true);
  }
}

export default new App().app;
