import { Document } from "mongoose";

export interface ICreditCard extends Document {
  csv: String;
  expiry: String;
  card_number: String;
  API_KEY: String;
}
