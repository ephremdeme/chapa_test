import jwt from "jsonwebtoken";
import { IUser } from "modules/users/model";

export default function generateJwtToken(user: IUser) {
  return jwt.sign(
    {
      sub: user.id,
      id: user.id,
      email: user.email,
    },
    Buffer.from(process.env.ACCESS_TOKEN_SECRET, "base64"),
    { expiresIn: "12h" }
  );
}
