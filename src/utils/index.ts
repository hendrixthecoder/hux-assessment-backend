import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  throw new Error("JWT Secret not provided!");
}

export const generateToken = (userId: string) => {
  return jwt.sign({ _id: userId }, SECRET, { expiresIn: "1h" });
};
