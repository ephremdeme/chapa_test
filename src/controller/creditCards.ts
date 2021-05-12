import { NextFunction, Request, Response } from "express";
import { response_status_codes } from "../middleware/errorHandler";
import { asyncHandler } from "../middleware/asyncHandler";
import { CreditCard } from "../modules/credit_card/schema";
import { ErrorResponse } from "../util/errorResponse";

export const getAllCreditCards = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.get("api_key");

    const allCards = await CreditCard.find({ API_KEY: apiKey });
    res
      .status(200)
      .json({
        success: true,
        count: allCards.length,
        data: allCards,
        message: "Successfully deleted a card!",
      });
  }
);

export const getCreditCardById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.get("api_key");

    const creditCard = await CreditCard.findOne({
      _id: req.params.id,
      API_KEY: apiKey,
    });
    if (!creditCard) {
      next(new ErrorResponse("Failed Finding a Credit Card", 404));
    } else {
      res.status(200).json({
        data: creditCard,
        success: true,
        messsage: "Successfully Inserted.",
      });
    }
  }
);

export const storeCard = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);

    const { csv, expiry, card_number } = req.body;
    const apiKey = req.get("api_key");
    if (csv && expiry && card_number && apiKey) {
      const card = await CreditCard.create({
        csv,
        expiry,
        card_number,
        API_KEY: apiKey,
      });
      res.status(response_status_codes.success).json({
        success: true,
        messsage: "Successfully Inserted.",
        data: card,
      });
    } else {
      next(
        new ErrorResponse(
          "csv, expiry & card_number are required!",
          response_status_codes.bad_request
        )
      );
    }
  }
);

export const deleteCard = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.get("api_key");

    const card = await CreditCard.findOneAndDelete({
      _id: req.params.id,
      API_KEY: apiKey,
    });

    if (!card) {
      next(new ErrorResponse("Failed Finding a Credit Card", 404));
    } else {
      res.status(response_status_codes.success).json({
        success: true,
        data: null,
        message: "Successfully deleted a card!",
      });
    }
  }
);
