import mongoose, { Model, Schema } from "mongoose";
import { IUser, UserRole } from "./model";

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: UserRole,
    default: "DEVELOPER",
  },
  API_KEY: [
    {
      type: String,
      required: true,
    },
  ],
});

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.password;
  },
});

export const UserModel: Model<IUser> = mongoose.model("User", UserSchema);

export default UserModel;
