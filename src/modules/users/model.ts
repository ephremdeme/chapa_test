import { Document } from "mongoose";

export enum UserRole {
  DEVELOPER = "DEVELOPER",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface IUser extends Document {
  email: String;
  password: String;
  role: UserRole;
  API_KEY: String[];
}
