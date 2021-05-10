import app from "./config/app";
import { Request, Response } from "express";
import { errorHandler } from "./middleware/errorHandler";

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10) || 5001;

app.get("/about", (req, res) => {
  res.send({
    Author: "Ephrem Demelash",
    Github: "github.com/ephremdeme",
    Email: "demelashephrem@gmail.com",
    LinkedIn: "linkedin.com/in/ephrem-demelash/",
  });
});

app.use(errorHandler());

app.listen(PORT, () => {
  console.log(" Express server listening on " + PORT);
});
