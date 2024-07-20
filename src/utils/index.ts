import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getJWTSecret } from "../lib";

dotenv.config();

export const generateToken = (userId: string) => {
  return jwt.sign({ _id: userId }, getJWTSecret(), { expiresIn: "1h" });
};
