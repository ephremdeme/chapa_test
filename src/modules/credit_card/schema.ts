import mongoose, { Model, Schema } from "mongoose";
import { ICreditCard } from "./model";

const CreditSchema: Schema = new Schema({
  csv: {
    type: Number,
    required: [true, "CSV Number Required"!],
  },
  expiry: {
    type: String,
    required: [true, "Expiry Date Required"!],
  },
  card_number: {
    type: String,
    required: [true, "Credit Card Number Required"!],
  },
  API_KEY: {
    type: String,
    required: [true, "API_KEY Is Required"!],
  },
});

CreditSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.API_KEY;
  },
});

export const CreditCard: Model<ICreditCard> = mongoose.model(
  "CreditCard",
  CreditSchema
);

CreditCard.createIndexes({ token: 1 });

export default CreditCard;
